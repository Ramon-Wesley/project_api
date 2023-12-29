
import SupplierFactory from "../../../../../../domain/supplier/factory/SupplierFactory";
import SupplierRepositorySequelize from "../../../supplier/repository/SupplierRepositorySequelize";
import Address from "../../../../../../domain/@shared/object-value/address/Address";
import SupplierModel from "../../../supplier/model/SupplierModel";
import AddressModel from "../../../address/model/AddressModel";
import EmployeeFactory from "../../../../../../domain/employee/factory/EmployeeFactory";
import EmployeeRepositorySequelize from "../../../employee/repository/EmployeeRepositorySequelize";
import EmployeeModel from "../../../employee/model/EmployeeModel";
import {SaleOrderFactory}  from "../../../../../../domain/checkout/salesOrder/factory/SaleOrder.factory"
import SaleOrderItemFactory from "../../../../../../domain/checkout/salesOrder/saleOrder-item/factory/SaleOrder-item.factory";
import ProductFactory from "../../../../../../domain/checkout/products/factory/Product.factory";
import { SaleOrderItemModel } from "../model/SaleOrderItemModel";
import { SaleOrderModel } from "../model/SaleOrderModel";
import ProductRepositorySequelize from "../../products/repository/ProductRepository";
import SaleOrderRepositorySequelize from "./SaleOrderRepositorySequelize";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import SequelizeDb from "../../../config/SequelizeDB";
import CategoryFactory from "../../../../../../domain/checkout/products/category/factory/CategoryFactory";
import Product from "../../../../../../domain/checkout/products/entity/Product";
import CategoryModel from "../../products/category/model/CategoryModel";


describe("test the saleOrderReppository", () => {
    let sequelize:Sequelize;  

      
   beforeEach(async()=>{ 
    sequelize= await SequelizeDb.getInstance();               
 
     })
 
      afterEach(async()=>{
         await sequelize.close()
         
     })
    it("save sale order data correctly", async()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","15.287.087/0001-05",
        "supplier@hotmail.com",new Date("2000-01-01"),address)
        
        await supplierRepository.create(supplier);
        const supplierModel=await SupplierModel.findOne({where:{id:supplier.Id}, include: [{ model: AddressModel}]})

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})

        const productRepository = new ProductRepositorySequelize();
        const product={
            id:"123",
            name:"product1",
            quantity:3,
            price:100
        }
        const category=CategoryFactory.create("category1","category1 description")
        await CategoryModel.create({
            id:category.Id,
            name:category.Name,
            description:category.Description
        })
        const result=new Product(product.id,product.name,product.price,product.quantity,category.Id);
        await productRepository.create(result);
    
        const saleOrderRepository= new SaleOrderRepositorySequelize(sequelize);
        const saleOrderItem=SaleOrderItemFactory.create(result.Id,10,result.Price)
        const saleOrder=SaleOrderFactory.create(supplier.Id,employee.Id,[saleOrderItem]);
        
        await saleOrderRepository.create(saleOrder);
        
        const saleOrderModel=await SaleOrderModel.findOne({where:{id:saleOrder.Id},include:[{model:SaleOrderItemModel}]})

        expect(saleOrderModel).toBeDefined()
        expect(saleOrderModel?.id).toBe(saleOrder.Id)
        expect(saleOrderModel?.supplier_id).toBe(supplierModel?.id)
        expect(saleOrderModel?.employee_id).toBe(employeeModel?.id)
        expect(saleOrderModel?.items.length).toBe(1)
        expect(saleOrderModel?.items[0].id).toBe(saleOrderItem.Id)
        expect(saleOrderModel?.items[0].product_id).toBe(result.Id)
        expect(saleOrderModel?.items[0].quantity).toBe(saleOrderItem.Quantity)
        expect(saleOrderModel?.items[0].total).toBe(saleOrderItem.Total)     
    })

    it("update sale order data correctly", async()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","15.287.087/0001-05",
        "supplier@hotmail.com",new Date("2000-01-01"),address)
        
        await supplierRepository.create(supplier);
        const supplierModel=await SupplierModel.findOne({where:{id:supplier.Id}, include: [{ model: AddressModel}]})

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})

        const productRepository = new ProductRepositorySequelize();
        const category=CategoryFactory.create("category1","category1 description")
        await CategoryModel.create({id:category.Id,name:category.Name,description:category.Description})
        const product=ProductFactory.create("product1",10,10,category.Id);
        await productRepository.create(product);
 
      
        
        const saleOrderRepository= new SaleOrderRepositorySequelize(sequelize);
        const saleOrderItem=SaleOrderItemFactory.create(product.Id,10,product.Price)
        const saleOrder=SaleOrderFactory.create(supplier.Id,employee.Id,[saleOrderItem]);
        
        await saleOrderRepository.create(saleOrder);
        
        const saleOrderModel=await SaleOrderModel.findOne({where:{id:saleOrder.Id},include:[{model:SaleOrderItemModel}]})
      
        const product2=ProductFactory.create("product2",200,10,category.Id);
        await productRepository.create(product2);

        const saleOrderItem2=SaleOrderItemFactory.create(product2.Id,20,product2.Price)
        
        saleOrderItem.changeQuantity(5)
        saleOrder.changeSaleOrderItems([saleOrderItem,saleOrderItem2])
        await saleOrderRepository.updateById(saleOrder.Id,saleOrder);
        const saleOrderModel2=await SaleOrderModel.findOne({where:{id:saleOrder.Id},include:[{model:SaleOrderItemModel}]})
       
        expect(saleOrderModel2).toBeDefined()
        expect(saleOrderModel2?.id).toBe(saleOrder.Id)
        expect(saleOrderModel2?.supplier_id).toBe(supplierModel?.id)
        expect(saleOrderModel2?.employee_id).toBe(employeeModel?.id)
        expect(saleOrderModel2?.items.length).toBe(2)
        expect(saleOrderModel2?.items[0].id).toBe(saleOrderItem.Id)
        expect(saleOrderModel2?.items[0].product_id).toBe(product.Id)
        expect(saleOrderModel2?.items[0].quantity).toBe(saleOrderItem.Quantity)
        expect(saleOrderModel2?.items[0].total).toBe(saleOrderItem.Total)  
        expect(saleOrderModel2?.items[1].id).toBe(saleOrderItem2.Id)
        expect(saleOrderModel2?.items[1].product_id).toBe(product2.Id)
        expect(saleOrderModel2?.items[1].quantity).toBe(saleOrderItem2.Quantity)
        expect(saleOrderModel2?.items[1].total).toBe(saleOrderItem2.Total)   
    })

    it("find by id sale order data",async()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","15.287.087/0001-05",
        "supplier@hotmail.com",new Date("2000-01-01"),address)
        
        await supplierRepository.create(supplier);
        const supplierModel=await SupplierModel.findOne({where:{id:supplier.Id}, include: [{ model: AddressModel}]})

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})

        const productRepository = new ProductRepositorySequelize();
        const category=CategoryFactory.create("category1","category1 description")
        await CategoryModel.create({id:category.Id,name:category.Name,description:category.Description})
        const product=ProductFactory.create("product1",10,10,category.Id);
        await productRepository.create(product);
    
        const saleOrderRepository= new SaleOrderRepositorySequelize(sequelize);
        const saleOrderItem=SaleOrderItemFactory.create(product.Id,10,product.Price)
        const saleOrder=SaleOrderFactory.create(supplier.Id,employee.Id,[saleOrderItem]);
        
        await saleOrderRepository.create(saleOrder);

        const saleResult=await saleOrderRepository.findById(saleOrder.Id);
        expect(saleResult).toBeDefined()
        expect(saleResult?.Id).toBe(saleOrder.Id)
        expect(saleResult.Data.toString()).toBe(saleOrder.Data.toString())
        expect(saleResult?.Supplier_id).toBe(supplierModel?.id)
        expect(saleResult?.Employee_id).toBe(employeeModel?.id)
        expect(saleResult?.SaleOrderItems.length).toBe(1)
        expect(saleResult?.SaleOrderItems[0].Id).toBe(saleOrderItem.Id)
        expect(saleResult?.SaleOrderItems[0].ProductId).toBe(product.Id)
        expect(saleResult?.SaleOrderItems[0].Quantity).toBe(saleOrderItem.Quantity)
        expect(saleResult?.SaleOrderItems[0].Total).toBe(saleOrderItem.Total) 

    })

    it("find All sale order data orderBy DESC",async()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","15.287.087/0001-05",
        "supplier@hotmail.com",new Date("2000-01-01"),address)
        
        await supplierRepository.create(supplier);
       
        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
      
        const productRepository = new ProductRepositorySequelize();
        const category=CategoryFactory.create("category1","category1 description")
        await CategoryModel.create({id:category.Id,name:category.Name,description:category.Description})
        const product=ProductFactory.create("product1",10,10,category.Id);
        await productRepository.create(product);
    
        const saleOrderRepository= new SaleOrderRepositorySequelize(sequelize);
        const saleOrderItem=SaleOrderItemFactory.create(product.Id,10,product.Price)
        const saleOrder=SaleOrderFactory.create(supplier.Id,employee.Id,[saleOrderItem]);
        
        await saleOrderRepository.create(saleOrder);

        const saleOrderItem2=SaleOrderItemFactory.create(product.Id,10,product.Price)
        const saleOrder2=SaleOrderFactory.create(supplier.Id,employee.Id,[saleOrderItem2]);
        await saleOrderRepository.create(saleOrder2);


        const sort="desc"
        const filter=""
        const limit=7
        const page=1

        const saleResult=await saleOrderRepository.findAll(sort,filter,limit,page)
        
        expect(saleResult.entity[0].Id).toBe(saleOrder2.Id)
        expect(saleResult.entity[0].Supplier_id).toBe(saleOrder2.Supplier_id)
        expect(saleResult.entity[0].Employee_id).toBe(saleOrder2.Employee_id)
        expect(saleResult.entity[0].Total).toBe(saleOrder2.Total)
        expect(saleResult.entity[0].SaleOrderItems[0].Id).toBe(saleOrder2.SaleOrderItems[0].Id)
        expect(saleResult.entity[0].Data.toString()).toBe(saleOrder2.Data.toString())
        expect(saleResult.entity[0].SaleOrderItems[0].ProductId).toBe(saleOrder2.SaleOrderItems[0].ProductId)
        expect(saleResult.entity[0].SaleOrderItems[0].Quantity).toBe(saleOrder2.SaleOrderItems[0].Quantity)
        expect(saleResult.entity[0].SaleOrderItems[0].Total).toBe(saleOrder2.SaleOrderItems[0].Total)
        expect(saleResult.entity[0].SaleOrderItems[0].UnitaryValue).toBe(saleOrder2.SaleOrderItems[0].UnitaryValue)


        expect(saleResult.entity[1].Id).toBe(saleOrder.Id)
        expect(saleResult.entity[1].Supplier_id).toBe(saleOrder.Supplier_id)
        expect(saleResult.entity[1].Employee_id).toBe(saleOrder.Employee_id)
        expect(saleResult.entity[1].Total).toBe(saleOrder.Total)
        expect(saleResult.entity[1].Data.toString()).toBe(saleOrder.Data.toString())
        expect(saleResult.entity[1].SaleOrderItems[0].Id).toBe(saleOrder.SaleOrderItems[0].Id)
        expect(saleResult.entity[1].SaleOrderItems[0].ProductId).toBe(saleOrder.SaleOrderItems[0].ProductId)
        expect(saleResult.entity[1].SaleOrderItems[0].Quantity).toBe(saleOrder.SaleOrderItems[0].Quantity)
        expect(saleResult.entity[1].SaleOrderItems[0].Total).toBe(saleOrder.SaleOrderItems[0].Total)
        expect(saleResult.entity[1].SaleOrderItems[0].UnitaryValue).toBe(saleOrder.SaleOrderItems[0].UnitaryValue)


        expect(saleResult.total_page).toBe(1)
        expect(saleResult.number_of_elements).toBe(2)
        expect(saleResult.current_page).toBe(page);
       

    })

    it("delete by id sale order", async()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","15.287.087/0001-05",
        "supplier@hotmail.com",new Date("2000-01-01"),address)
        
        await supplierRepository.create(supplier);
        const supplierModel=await SupplierModel.findOne({where:{id:supplier.Id}, include: [{ model: AddressModel}]})

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})

        const productRepository = new ProductRepositorySequelize();
        const category=CategoryFactory.create("category1","category1 description")
        await CategoryModel.create({id:category.Id,name:category.Name,description:category.Description})
        const product=ProductFactory.create("product1",10,10,category.Id);
        await productRepository.create(product);
    
        const saleOrderRepository= new SaleOrderRepositorySequelize(sequelize);
        const saleOrderItem=SaleOrderItemFactory.create(product.Id,10,product.Price)
        const saleOrder=SaleOrderFactory.create(supplier.Id,employee.Id,[saleOrderItem]);
        
        await saleOrderRepository.create(saleOrder);
        
        await saleOrderRepository.deleteById(saleOrder.Id);

        const saleOrderModel=await SaleOrderModel.findOne({where:{id:saleOrder.Id},include:[{model:SaleOrderItemModel}]})

        expect(saleOrderModel).toBeNull();

    })



})