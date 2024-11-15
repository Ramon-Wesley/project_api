
import SupplierFactory from "../../../../../../domain/supplier/factory/SupplierFactory";
import SupplierRepositorySequelize from "../../../supplier/repository/SupplierRepositorySequelize";
import Address from "../../../../../../domain/@shared/object-value/address/Address";
import SupplierModel from "../../../supplier/model/SupplierModel";
import AddressModel from "../../../address/model/AddressModel";
import EmployeeFactory from "../../../../../../domain/employee/factory/EmployeeFactory";
import EmployeeRepositorySequelize from "../../../employee/repository/EmployeeRepositorySequelize";
import EmployeeModel from "../../../employee/model/EmployeeModel";
import { PurchaseOrderFactory } from "../../../../../../domain/checkout/purchaseOrder/factory/PurchaseOrder.factory";
import PurchaseOrderItemFactory from "../../../../../../domain/checkout/purchaseOrder/purchaseOrder-item/factory/PurchaseOrder-item.factory";
import ProductFactory from "../../../../../../domain/checkout/products/factory/Product.factory";
import { PurchaseOrderItemModel } from "../model/PurchaseOrderItemModel";
import { PurchaseOrderModel } from "../model/PurchaseOrderModel";
import ProductRepositorySequelize from "../../products/repository/ProductRepository";
import PurchaseOrderRepositorySequelize from "./PurchaseOrderRepositorySequelize";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import SequelizeDb from "../../../config/SequelizeDB";
import CategoryFactory from "../../../../../../domain/checkout/products/category/factory/CategoryFactory";
import CategoryModel from "../../products/category/model/CategoryModel";


describe("test the purchasesOrderReppository", () => {
    let sequelize:Sequelize;  

      
   beforeEach(async()=>{ 
    sequelize= await SequelizeDb.getInstance();            
 
     })
 
      afterEach(async()=>{
         await sequelize.close()
         
     })
    it("save purchases order data correctly", async()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","533.408.010-45",
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
    
        const purchasesOrderRepository= new PurchaseOrderRepositorySequelize(sequelize,productRepository);
        const purchasesOrderItem=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchasesOrder=PurchaseOrderFactory.create(supplier.Id,employee.Id,[purchasesOrderItem]);
        
        await purchasesOrderRepository.create(purchasesOrder,[product]);
        
        const purchasesOrderModel=await PurchaseOrderModel.findOne({where:{id:purchasesOrder.Id},include:[{model:PurchaseOrderItemModel}]})

        expect(purchasesOrderModel).toBeDefined()
        expect(purchasesOrderModel?.id).toBe(purchasesOrder.Id)
        expect(purchasesOrderModel?.supplier_id).toBe(supplierModel?.id)
        expect(purchasesOrderModel?.employee_id).toBe(employeeModel?.id)
        expect(purchasesOrderModel?.items.length).toBe(1)
        expect(purchasesOrderModel?.items[0].id).toBe(purchasesOrderItem.Id)
        expect(purchasesOrderModel?.items[0].product_id).toBe(product.Id)
        expect(purchasesOrderModel?.items[0].quantity).toBe(purchasesOrderItem.Quantity)
        expect(purchasesOrderModel?.items[0].total).toBe(purchasesOrderItem.Total)     
    })

    it("update purchases order data correctly", async()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","533.408.010-45",
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
 
      
        
        const purchasesOrderRepository= new PurchaseOrderRepositorySequelize(sequelize,productRepository);
        const purchasesOrderItem=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchasesOrder=PurchaseOrderFactory.create(supplier.Id,employee.Id,[purchasesOrderItem]);
        
        await purchasesOrderRepository.create(purchasesOrder,[product]);
        
        const purchasesOrderModel=await PurchaseOrderModel.findOne({where:{id:purchasesOrder.Id},include:[{model:PurchaseOrderItemModel}]})
      
        const product2=ProductFactory.create("product2",200,10,category.Id);
        await productRepository.create(product2);

        const purchasesOrderItem2=PurchaseOrderItemFactory.create(product2.Id,20,product2.Price)
        
        purchasesOrderItem.changeQuantity(5)
        purchasesOrder.changePurchaseOrderItems([purchasesOrderItem,purchasesOrderItem2])
        await purchasesOrderRepository.updateById(purchasesOrder.Id,purchasesOrder,[product,product2]);
        const purchasesOrderModel2=await PurchaseOrderModel.findOne({where:{id:purchasesOrder.Id},include:[{model:PurchaseOrderItemModel}]})
       
        expect(purchasesOrderModel2).toBeDefined()
        expect(purchasesOrderModel2?.id).toBe(purchasesOrder.Id)
        expect(purchasesOrderModel2?.supplier_id).toBe(supplierModel?.id)
        expect(purchasesOrderModel2?.employee_id).toBe(employeeModel?.id)
        expect(purchasesOrderModel2?.items.length).toBe(2)
        expect(purchasesOrderModel2?.items[0].id).toBe(purchasesOrderItem.Id)
        expect(purchasesOrderModel2?.items[0].product_id).toBe(product.Id)
        expect(purchasesOrderModel2?.items[0].quantity).toBe(purchasesOrderItem.Quantity)
        expect(purchasesOrderModel2?.items[0].total).toBe(purchasesOrderItem.Total)  
        expect(purchasesOrderModel2?.items[1].id).toBe(purchasesOrderItem2.Id)
        expect(purchasesOrderModel2?.items[1].product_id).toBe(product2.Id)
        expect(purchasesOrderModel2?.items[1].quantity).toBe(purchasesOrderItem2.Quantity)
        expect(purchasesOrderModel2?.items[1].total).toBe(purchasesOrderItem2.Total)   
    })

    it("find by id purchases order data",async()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","533.408.010-45",
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
    
        const purchasesOrderRepository= new PurchaseOrderRepositorySequelize(sequelize,productRepository);
        const purchasesOrderItem=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchasesOrder=PurchaseOrderFactory.create(supplier.Id,employee.Id,[purchasesOrderItem]);
        
        await purchasesOrderRepository.create(purchasesOrder,[product]);

        const purchasesResult=await purchasesOrderRepository.findById(purchasesOrder.Id);
        expect(purchasesResult).toBeDefined()
        expect(purchasesResult?.Id).toBe(purchasesOrder.Id)
        expect(purchasesResult.Data.toString()).toBe(purchasesOrder.Data.toString())
        expect(purchasesResult?.Supplier_id).toBe(supplierModel?.id)
        expect(purchasesResult?.Employee_id).toBe(employeeModel?.id)
        expect(purchasesResult?.PurchaseOrderItems.length).toBe(1)
        expect(purchasesResult?.PurchaseOrderItems[0].Id).toBe(purchasesOrderItem.Id)
        expect(purchasesResult?.PurchaseOrderItems[0].ProductId).toBe(product.Id)
        expect(purchasesResult?.PurchaseOrderItems[0].Quantity).toBe(purchasesOrderItem.Quantity)
        expect(purchasesResult?.PurchaseOrderItems[0].Total).toBe(purchasesOrderItem.Total) 

    })

    it("find All purchases order data orderBy DESC",async()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","533.408.010-45",
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
    
        const purchasesOrderRepository= new PurchaseOrderRepositorySequelize(sequelize,productRepository);
        const purchasesOrderItem=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchasesOrder=PurchaseOrderFactory.create(supplier.Id,employee.Id,[purchasesOrderItem]);
        
        await purchasesOrderRepository.create(purchasesOrder,[product]);

        const purchasesOrderItem2=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchasesOrder2=PurchaseOrderFactory.create(supplier.Id,employee.Id,[purchasesOrderItem2]);
        await purchasesOrderRepository.create(purchasesOrder2,[product]);


        const sort="desc"
        const filter=""
        const limit=7
        const page=1

        const purchasesResult=await purchasesOrderRepository.findAll(sort,filter,limit,page)
        
        expect(purchasesResult.entity[0].Id).toBe(purchasesOrder2.Id)
        expect(purchasesResult.entity[0].Supplier_id).toBe(purchasesOrder2.Supplier_id)
        expect(purchasesResult.entity[0].Employee_id).toBe(purchasesOrder2.Employee_id)
        expect(purchasesResult.entity[0].Total).toBe(purchasesOrder2.Total)
        expect(purchasesResult.entity[0].PurchaseOrderItems[0].Id).toBe(purchasesOrder2.PurchaseOrderItems[0].Id)
        expect(purchasesResult.entity[0].Data.toString()).toBe(purchasesOrder2.Data.toString())
        expect(purchasesResult.entity[0].PurchaseOrderItems[0].ProductId).toBe(purchasesOrder2.PurchaseOrderItems[0].ProductId)
        expect(purchasesResult.entity[0].PurchaseOrderItems[0].Quantity).toBe(purchasesOrder2.PurchaseOrderItems[0].Quantity)
        expect(purchasesResult.entity[0].PurchaseOrderItems[0].Total).toBe(purchasesOrder2.PurchaseOrderItems[0].Total)
        expect(purchasesResult.entity[0].PurchaseOrderItems[0].UnitaryValue).toBe(purchasesOrder2.PurchaseOrderItems[0].UnitaryValue)


        expect(purchasesResult.entity[1].Id).toBe(purchasesOrder.Id)
        expect(purchasesResult.entity[1].Supplier_id).toBe(purchasesOrder.Supplier_id)
        expect(purchasesResult.entity[1].Employee_id).toBe(purchasesOrder.Employee_id)
        expect(purchasesResult.entity[1].Total).toBe(purchasesOrder.Total)
        expect(purchasesResult.entity[1].Data.toString()).toBe(purchasesOrder.Data.toString())
        expect(purchasesResult.entity[1].PurchaseOrderItems[0].Id).toBe(purchasesOrder.PurchaseOrderItems[0].Id)
        expect(purchasesResult.entity[1].PurchaseOrderItems[0].ProductId).toBe(purchasesOrder.PurchaseOrderItems[0].ProductId)
        expect(purchasesResult.entity[1].PurchaseOrderItems[0].Quantity).toBe(purchasesOrder.PurchaseOrderItems[0].Quantity)
        expect(purchasesResult.entity[1].PurchaseOrderItems[0].Total).toBe(purchasesOrder.PurchaseOrderItems[0].Total)
        expect(purchasesResult.entity[1].PurchaseOrderItems[0].UnitaryValue).toBe(purchasesOrder.PurchaseOrderItems[0].UnitaryValue)


        expect(purchasesResult.total_page).toBe(1)
        expect(purchasesResult.number_of_elements).toBe(2)
        expect(purchasesResult.current_page).toBe(page);
       

    })

    it("delete by id purchases order", async()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","533.408.010-45",
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
    
        const purchasesOrderRepository= new PurchaseOrderRepositorySequelize(sequelize,productRepository);
        const purchasesOrderItem=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchasesOrder=PurchaseOrderFactory.create(supplier.Id,employee.Id,[purchasesOrderItem]);
        
        await purchasesOrderRepository.create(purchasesOrder,[product]);
        
        await purchasesOrderRepository.deleteById(purchasesOrder.Id);

        const purchasesOrderModel=await PurchaseOrderModel.findOne({where:{id:purchasesOrder.Id},include:[{model:PurchaseOrderItemModel}]})

        expect(purchasesOrderModel).toBeNull();

    })



})