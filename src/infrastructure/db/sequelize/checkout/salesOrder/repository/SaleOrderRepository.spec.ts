
import CustomerFactory from "../../../../../../domain/customer/factory/CustomerFactory";
import CustomerRepositorySequelize from "../../../customer/repository/CustomerRepositorySequelize";
import Address from "../../../../../../domain/@shared/object-value/address/Address";
import CustomerModel from "../../../customer/model/CustomerModel";
import AddressModel from "../../../address/model/AddressModel";
import EmployeeFactory from "../../../../../../domain/employee/factory/EmployeeFactory";
import EmployeeRepositorySequelize from "../../../employee/repository/EmployeeRepositorySequelize";
import EmployeeModel from "../../../employee/model/EmployeeModel";
import {SalesOrderFactory}  from "../../../../../../domain/checkout/salesOrder/factory/SalesOrder.factory"
import SalesOrderItemFactory from "../../../../../../domain/checkout/salesOrder/salesOrder-item/factory/SalesOrder-item.factory";
import ProductFactory from "../../../../../../domain/checkout/products/factory/Product.factory";
import { SaleOrderItemModel } from "../model/SaleOrderItemModel";
import { SaleOrderModel } from "../model/SaleOrderModel";
import ProductRepositorySequelize from "../../products/repository/ProductRepository";
import SalesOrderRepositorySequelize from "./SaleOrderRepositorySequelize";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import SequelizeDb from "../../../config/SequelizeDB";
import CategoryFactory from "../../../../../../domain/checkout/products/category/factory/CategoryFactory";
import Product from "../../../../../../domain/checkout/products/entity/Product";
import CategoryModel from "../../products/category/model/CategoryModel";


describe("test the salesOrderReppository", () => {
    let sequelize:Sequelize;  

      
   beforeEach(async()=>{ 
    sequelize= await SequelizeDb.getInstance();               
 
     })
 
      afterEach(async()=>{
         await sequelize.close()
         
     })
    it("save sales order data correctly", async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","15.287.087/0001-05",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})

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
    
        const salesOrderRepository= new SalesOrderRepositorySequelize(sequelize);
        const salesOrderItem=SalesOrderItemFactory.create(result.Id,10,result.Price)
        const salesOrder=SalesOrderFactory.create(customer.Id,employee.Id,[salesOrderItem]);
        
        await salesOrderRepository.create(salesOrder);
        
        const salesOrderModel=await SaleOrderModel.findOne({where:{id:salesOrder.Id},include:[{model:SaleOrderItemModel}]})

        expect(salesOrderModel).toBeDefined()
        expect(salesOrderModel?.id).toBe(salesOrder.Id)
        expect(salesOrderModel?.customer_id).toBe(customerModel?.id)
        expect(salesOrderModel?.employee_id).toBe(employeeModel?.id)
        expect(salesOrderModel?.items.length).toBe(1)
        expect(salesOrderModel?.items[0].id).toBe(salesOrderItem.Id)
        expect(salesOrderModel?.items[0].product_id).toBe(result.Id)
        expect(salesOrderModel?.items[0].quantity).toBe(salesOrderItem.Quantity)
        expect(salesOrderModel?.items[0].total).toBe(salesOrderItem.Total)     
    })

    it("update sales order data correctly", async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","15.287.087/0001-05",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})

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
 
      
        
        const salesOrderRepository= new SalesOrderRepositorySequelize(sequelize);
        const salesOrderItem=SalesOrderItemFactory.create(product.Id,10,product.Price)
        const salesOrder=SalesOrderFactory.create(customer.Id,employee.Id,[salesOrderItem]);
        
        await salesOrderRepository.create(salesOrder);
        
        const salesOrderModel=await SaleOrderModel.findOne({where:{id:salesOrder.Id},include:[{model:SaleOrderItemModel}]})
      
        const product2=ProductFactory.create("product2",200,10,category.Id);
        await productRepository.create(product2);

        const salesOrderItem2=SalesOrderItemFactory.create(product2.Id,20,product2.Price)
        
        salesOrderItem.changeQuantity(5)
        salesOrder.changeSalesOrderItems([salesOrderItem,salesOrderItem2])
        await salesOrderRepository.updateById(salesOrder.Id,salesOrder);
        const salesOrderModel2=await SaleOrderModel.findOne({where:{id:salesOrder.Id},include:[{model:SaleOrderItemModel}]})
       
        expect(salesOrderModel2).toBeDefined()
        expect(salesOrderModel2?.id).toBe(salesOrder.Id)
        expect(salesOrderModel2?.customer_id).toBe(customerModel?.id)
        expect(salesOrderModel2?.employee_id).toBe(employeeModel?.id)
        expect(salesOrderModel2?.items.length).toBe(2)
        expect(salesOrderModel2?.items[0].id).toBe(salesOrderItem.Id)
        expect(salesOrderModel2?.items[0].product_id).toBe(product.Id)
        expect(salesOrderModel2?.items[0].quantity).toBe(salesOrderItem.Quantity)
        expect(salesOrderModel2?.items[0].total).toBe(salesOrderItem.Total)  
        expect(salesOrderModel2?.items[1].id).toBe(salesOrderItem2.Id)
        expect(salesOrderModel2?.items[1].product_id).toBe(product2.Id)
        expect(salesOrderModel2?.items[1].quantity).toBe(salesOrderItem2.Quantity)
        expect(salesOrderModel2?.items[1].total).toBe(salesOrderItem2.Total)   
    })

    it("find by id sales order data",async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","15.287.087/0001-05",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})

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
    
        const salesOrderRepository= new SalesOrderRepositorySequelize(sequelize);
        const salesOrderItem=SalesOrderItemFactory.create(product.Id,10,product.Price)
        const salesOrder=SalesOrderFactory.create(customer.Id,employee.Id,[salesOrderItem]);
        
        await salesOrderRepository.create(salesOrder);

        const salesResult=await salesOrderRepository.findById(salesOrder.Id);
        expect(salesResult).toBeDefined()
        expect(salesResult?.Id).toBe(salesOrder.Id)
        expect(salesResult.Data.toString()).toBe(salesOrder.Data.toString())
        expect(salesResult?.Customer_id).toBe(customerModel?.id)
        expect(salesResult?.Employee_id).toBe(employeeModel?.id)
        expect(salesResult?.SalesOrderItems.length).toBe(1)
        expect(salesResult?.SalesOrderItems[0].Id).toBe(salesOrderItem.Id)
        expect(salesResult?.SalesOrderItems[0].ProductId).toBe(product.Id)
        expect(salesResult?.SalesOrderItems[0].Quantity).toBe(salesOrderItem.Quantity)
        expect(salesResult?.SalesOrderItems[0].Total).toBe(salesOrderItem.Total) 

    })

    it("find All sales order data orderBy DESC",async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","15.287.087/0001-05",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
       
        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
      
        const productRepository = new ProductRepositorySequelize();
        const category=CategoryFactory.create("category1","category1 description")
        await CategoryModel.create({id:category.Id,name:category.Name,description:category.Description})
        const product=ProductFactory.create("product1",10,10,category.Id);
        await productRepository.create(product);
    
        const salesOrderRepository= new SalesOrderRepositorySequelize(sequelize);
        const salesOrderItem=SalesOrderItemFactory.create(product.Id,10,product.Price)
        const salesOrder=SalesOrderFactory.create(customer.Id,employee.Id,[salesOrderItem]);
        
        await salesOrderRepository.create(salesOrder);

        const salesOrderItem2=SalesOrderItemFactory.create(product.Id,10,product.Price)
        const salesOrder2=SalesOrderFactory.create(customer.Id,employee.Id,[salesOrderItem2]);
        await salesOrderRepository.create(salesOrder2);


        const sort="desc"
        const filter=""
        const limit=7
        const page=1

        const salesResult=await salesOrderRepository.findAll(sort,filter,limit,page)
        
        expect(salesResult.entity[0].Id).toBe(salesOrder2.Id)
        expect(salesResult.entity[0].Customer_id).toBe(salesOrder2.Customer_id)
        expect(salesResult.entity[0].Employee_id).toBe(salesOrder2.Employee_id)
        expect(salesResult.entity[0].Total).toBe(salesOrder2.Total)
        expect(salesResult.entity[0].SalesOrderItems[0].Id).toBe(salesOrder2.SalesOrderItems[0].Id)
        expect(salesResult.entity[0].Data.toString()).toBe(salesOrder2.Data.toString())
        expect(salesResult.entity[0].SalesOrderItems[0].ProductId).toBe(salesOrder2.SalesOrderItems[0].ProductId)
        expect(salesResult.entity[0].SalesOrderItems[0].Quantity).toBe(salesOrder2.SalesOrderItems[0].Quantity)
        expect(salesResult.entity[0].SalesOrderItems[0].Total).toBe(salesOrder2.SalesOrderItems[0].Total)
        expect(salesResult.entity[0].SalesOrderItems[0].UnitaryValue).toBe(salesOrder2.SalesOrderItems[0].UnitaryValue)


        expect(salesResult.entity[1].Id).toBe(salesOrder.Id)
        expect(salesResult.entity[1].Customer_id).toBe(salesOrder.Customer_id)
        expect(salesResult.entity[1].Employee_id).toBe(salesOrder.Employee_id)
        expect(salesResult.entity[1].Total).toBe(salesOrder.Total)
        expect(salesResult.entity[1].Data.toString()).toBe(salesOrder.Data.toString())
        expect(salesResult.entity[1].SalesOrderItems[0].Id).toBe(salesOrder.SalesOrderItems[0].Id)
        expect(salesResult.entity[1].SalesOrderItems[0].ProductId).toBe(salesOrder.SalesOrderItems[0].ProductId)
        expect(salesResult.entity[1].SalesOrderItems[0].Quantity).toBe(salesOrder.SalesOrderItems[0].Quantity)
        expect(salesResult.entity[1].SalesOrderItems[0].Total).toBe(salesOrder.SalesOrderItems[0].Total)
        expect(salesResult.entity[1].SalesOrderItems[0].UnitaryValue).toBe(salesOrder.SalesOrderItems[0].UnitaryValue)


        expect(salesResult.total_page).toBe(1)
        expect(salesResult.number_of_elements).toBe(2)
        expect(salesResult.current_page).toBe(page);
       

    })

    it("delete by id sales order", async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","15.287.087/0001-05",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})

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
    
        const salesOrderRepository= new SalesOrderRepositorySequelize(sequelize);
        const salesOrderItem=SalesOrderItemFactory.create(product.Id,10,product.Price)
        const salesOrder=SalesOrderFactory.create(customer.Id,employee.Id,[salesOrderItem]);
        
        await salesOrderRepository.create(salesOrder);
        
        await salesOrderRepository.deleteById(salesOrder.Id);

        const salesOrderModel=await SaleOrderModel.findOne({where:{id:salesOrder.Id},include:[{model:SaleOrderItemModel}]})

        expect(salesOrderModel).toBeNull();

    })



})