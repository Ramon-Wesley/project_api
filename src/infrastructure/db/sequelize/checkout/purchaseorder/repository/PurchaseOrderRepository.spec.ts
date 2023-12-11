
import SequelizeFactory from "../../../factory/Sequelize.factory";
import CustomerFactory from "../../../../../../domain/customer/factory/CustomerFactory";
import CustomerRepositorySequelize from "../../../customer/repository/CustomerRepositorySequelize";
import Address from "../../../../../../domain/@shared/object-value/address/Address";
import CustomerModel from "../../../customer/model/CustomerModel";
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


describe("test the purchaseOrderReppository", () => {
    let sequelize:Sequelize;  

      
   beforeEach(async()=>{ 
    sequelize= await SequelizeFactory.execute();          
 
     })
 
      afterEach(async()=>{
         await sequelize.close()
         
     })
    it("save purchase order data correctly", async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})

        const productRepository = new ProductRepositorySequelize();
        const product=ProductFactory.create("product1",100);
        await productRepository.create(product);
    
        const purchaseOrderRepository= new PurchaseOrderRepositorySequelize(sequelize);
        const purchaseOrderItem=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchaseOrder=PurchaseOrderFactory.create(customer.Id,employee.Id,[purchaseOrderItem]);
        
        await purchaseOrderRepository.create(purchaseOrder);
        
        const purchaseOrderModel=await PurchaseOrderModel.findOne({where:{id:purchaseOrder.Id},include:[{model:PurchaseOrderItemModel}]})

        expect(purchaseOrderModel).toBeDefined()
        expect(purchaseOrderModel?.id).toBe(purchaseOrder.Id)
        expect(purchaseOrderModel?.customer_id).toBe(customerModel?.id)
        expect(purchaseOrderModel?.employee_id).toBe(employeeModel?.id)
        expect(purchaseOrderModel?.items.length).toBe(1)
        expect(purchaseOrderModel?.items[0].id).toBe(purchaseOrderItem.Id)
        expect(purchaseOrderModel?.items[0].product_id).toBe(product.Id)
        expect(purchaseOrderModel?.items[0].quantity).toBe(purchaseOrderItem.Quantity)
        expect(purchaseOrderModel?.items[0].total).toBe(purchaseOrderItem.Total)     
    })

    it("update purchase order data correctly", async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})

        const productRepository = new ProductRepositorySequelize();
        const product=ProductFactory.create("product1",100);
        await productRepository.create(product);
 
      
        
        const purchaseOrderRepository= new PurchaseOrderRepositorySequelize(sequelize);
        const purchaseOrderItem=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchaseOrder=PurchaseOrderFactory.create(customer.Id,employee.Id,[purchaseOrderItem]);
        
        await purchaseOrderRepository.create(purchaseOrder);
        
        const purchaseOrderModel=await PurchaseOrderModel.findOne({where:{id:purchaseOrder.Id},include:[{model:PurchaseOrderItemModel}]})
      
        const product2=ProductFactory.create("product2",200);
        await productRepository.create(product2);

        const purchaseOrderItem2=PurchaseOrderItemFactory.create(product2.Id,20,product2.Price)
        
        purchaseOrderItem.changeQuantity(5)
        purchaseOrder.changePurchaseOrderItems([purchaseOrderItem,purchaseOrderItem2])
        await purchaseOrderRepository.updateById(purchaseOrder.Id,purchaseOrder);
        const purchaseOrderModel2=await PurchaseOrderModel.findOne({where:{id:purchaseOrder.Id},include:[{model:PurchaseOrderItemModel}]})
       
        expect(purchaseOrderModel2).toBeDefined()
        expect(purchaseOrderModel2?.id).toBe(purchaseOrder.Id)
        expect(purchaseOrderModel2?.customer_id).toBe(customerModel?.id)
        expect(purchaseOrderModel2?.employee_id).toBe(employeeModel?.id)
        expect(purchaseOrderModel2?.items.length).toBe(2)
        expect(purchaseOrderModel2?.items[0].id).toBe(purchaseOrderItem.Id)
        expect(purchaseOrderModel2?.items[0].product_id).toBe(product.Id)
        expect(purchaseOrderModel2?.items[0].quantity).toBe(purchaseOrderItem.Quantity)
        expect(purchaseOrderModel2?.items[0].total).toBe(purchaseOrderItem.Total)  
        expect(purchaseOrderModel2?.items[1].id).toBe(purchaseOrderItem2.Id)
        expect(purchaseOrderModel2?.items[1].product_id).toBe(product2.Id)
        expect(purchaseOrderModel2?.items[1].quantity).toBe(purchaseOrderItem2.Quantity)
        expect(purchaseOrderModel2?.items[1].total).toBe(purchaseOrderItem2.Total)   
    })

    it("find by id purchase order data",async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})

        const productRepository = new ProductRepositorySequelize();
        const product=ProductFactory.create("product1",100);
        await productRepository.create(product);
    
        const purchaseOrderRepository= new PurchaseOrderRepositorySequelize(sequelize);
        const purchaseOrderItem=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchaseOrder=PurchaseOrderFactory.create(customer.Id,employee.Id,[purchaseOrderItem]);
        
        await purchaseOrderRepository.create(purchaseOrder);

        const purchaseResult=await purchaseOrderRepository.findById(purchaseOrder.Id);
        expect(purchaseResult).toBeDefined()
        expect(purchaseResult?.Id).toBe(purchaseOrder.Id)
        expect(purchaseResult.Data.toString()).toBe(purchaseOrder.Data.toString())
        expect(purchaseResult?.Customer_id).toBe(customerModel?.id)
        expect(purchaseResult?.Employee_id).toBe(employeeModel?.id)
        expect(purchaseResult?.PurchaseOrderItems.length).toBe(1)
        expect(purchaseResult?.PurchaseOrderItems[0].Id).toBe(purchaseOrderItem.Id)
        expect(purchaseResult?.PurchaseOrderItems[0].ProductId).toBe(product.Id)
        expect(purchaseResult?.PurchaseOrderItems[0].Quantity).toBe(purchaseOrderItem.Quantity)
        expect(purchaseResult?.PurchaseOrderItems[0].Total).toBe(purchaseOrderItem.Total) 

    })

    it("find All purchase order data orderBy DESC",async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
       
        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
      
        const productRepository = new ProductRepositorySequelize();
        const product=ProductFactory.create("product1",100);
        await productRepository.create(product);
    
        const purchaseOrderRepository= new PurchaseOrderRepositorySequelize(sequelize);
        const purchaseOrderItem=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchaseOrder=PurchaseOrderFactory.create(customer.Id,employee.Id,[purchaseOrderItem]);
        
        await purchaseOrderRepository.create(purchaseOrder);

        const purchaseOrderItem2=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchaseOrder2=PurchaseOrderFactory.create(customer.Id,employee.Id,[purchaseOrderItem2]);
        await purchaseOrderRepository.create(purchaseOrder2);


        const sort="desc"
        const filter=""
        const limit=7
        const page=1

        const purchaseResult=await purchaseOrderRepository.findAll(sort,filter,limit,page)
        
        expect(purchaseResult.entity[0].Id).toBe(purchaseOrder2.Id)
        expect(purchaseResult.entity[0].Customer_id).toBe(purchaseOrder2.Customer_id)
        expect(purchaseResult.entity[0].Employee_id).toBe(purchaseOrder2.Employee_id)
        expect(purchaseResult.entity[0].Total).toBe(purchaseOrder2.Total)
        expect(purchaseResult.entity[0].PurchaseOrderItems[0].Id).toBe(purchaseOrder2.PurchaseOrderItems[0].Id)
        expect(purchaseResult.entity[0].Data.toString()).toBe(purchaseOrder2.Data.toString())
        expect(purchaseResult.entity[0].PurchaseOrderItems[0].ProductId).toBe(purchaseOrder2.PurchaseOrderItems[0].ProductId)
        expect(purchaseResult.entity[0].PurchaseOrderItems[0].Quantity).toBe(purchaseOrder2.PurchaseOrderItems[0].Quantity)
        expect(purchaseResult.entity[0].PurchaseOrderItems[0].Total).toBe(purchaseOrder2.PurchaseOrderItems[0].Total)
        expect(purchaseResult.entity[0].PurchaseOrderItems[0].UnitaryValue).toBe(purchaseOrder2.PurchaseOrderItems[0].UnitaryValue)


        expect(purchaseResult.entity[1].Id).toBe(purchaseOrder.Id)
        expect(purchaseResult.entity[1].Customer_id).toBe(purchaseOrder.Customer_id)
        expect(purchaseResult.entity[1].Employee_id).toBe(purchaseOrder.Employee_id)
        expect(purchaseResult.entity[1].Total).toBe(purchaseOrder.Total)
        expect(purchaseResult.entity[1].Data.toString()).toBe(purchaseOrder.Data.toString())
        expect(purchaseResult.entity[1].PurchaseOrderItems[0].Id).toBe(purchaseOrder.PurchaseOrderItems[0].Id)
        expect(purchaseResult.entity[1].PurchaseOrderItems[0].ProductId).toBe(purchaseOrder.PurchaseOrderItems[0].ProductId)
        expect(purchaseResult.entity[1].PurchaseOrderItems[0].Quantity).toBe(purchaseOrder.PurchaseOrderItems[0].Quantity)
        expect(purchaseResult.entity[1].PurchaseOrderItems[0].Total).toBe(purchaseOrder.PurchaseOrderItems[0].Total)
        expect(purchaseResult.entity[1].PurchaseOrderItems[0].UnitaryValue).toBe(purchaseOrder.PurchaseOrderItems[0].UnitaryValue)


        expect(purchaseResult.total_page).toBe(1)
        expect(purchaseResult.number_of_elements).toBe(2)
        expect(purchaseResult.current_page).toBe(page);
       

    })

    it("delete by id purchase order", async()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})

        const employeeRepository= new EmployeeRepositorySequelize();
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})

        const productRepository = new ProductRepositorySequelize();
        const product=ProductFactory.create("product1",100);
        await productRepository.create(product);
    
        const purchaseOrderRepository= new PurchaseOrderRepositorySequelize(sequelize);
        const purchaseOrderItem=PurchaseOrderItemFactory.create(product.Id,10,product.Price)
        const purchaseOrder=PurchaseOrderFactory.create(customer.Id,employee.Id,[purchaseOrderItem]);
        
        await purchaseOrderRepository.create(purchaseOrder);
        
        await purchaseOrderRepository.deleteById(purchaseOrder.Id);

        const purchaseOrderModel=await PurchaseOrderModel.findOne({where:{id:purchaseOrder.Id},include:[{model:PurchaseOrderItemModel}]})

        expect(purchaseOrderModel).toBeNull();

    })



})