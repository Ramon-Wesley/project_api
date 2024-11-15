import { Queue } from "bullmq";
import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import salesOrder from "../../../../domain/checkout/salesOrder/entity/SalesOrder";
import { SalesOrderFactory } from "../../../../domain/checkout/salesOrder/factory/SalesOrder.factory";
import salesOrderItem from "../../../../domain/checkout/salesOrder/salesOrder-item/entity/SalesOrder-item";
import salesOrderItemFactory from "../../../../domain/checkout/salesOrder/salesOrder-item/factory/SalesOrder-item.factory";
import salesOrderRepositoryInterface from "../../../../domain/checkout/salesOrder/repository/SalesOrder.repository";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/CustomerRepositoryInterface";
import { EmployeeRepositoryInterface } from "../../../../domain/employee/repository/Employee.repository.interface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import salesOrderCreateInDto from "./SalesOrderCreateInDto";
import { QueueFactory } from "../../../../infrastructure/queue/factory/QueueFactory";

export default class salesOrderCreateUseCase implements useCaseInterface<salesOrderCreateInDto,void>{

   constructor(
    private readonly salesOrderRepository:salesOrderRepositoryInterface,
    private readonly productRepository:ProductRepositoryInterface,
    private readonly customerRepository:CustomerRepositoryInterface,
    private readonly employeeRepository:EmployeeRepositoryInterface){
    }

   async execute(input: salesOrderCreateInDto): Promise<void> {
        try {
      
                let salesOrderItem:salesOrderItem[]=[];
                let salesOrder:salesOrder;
                const productIds=input.items.map(product=>product.product_id)
                
                const [customer,employee,products]=await Promise.all([
                    this.customerRepository.findById(input.customer_id),
                    this.employeeRepository.findById(input.employee_id),
                    this.productRepository.findByIds(productIds)
                ])
                
                const productMap=new Map(products.map(product=>[product.Id,product]));
                
                if(productIds.length!==products.length){
                    throw new Error("product not found!")
                }
                
                input.items.forEach((res)=>{
                    const product=productMap.get(res.product_id)
                    if(product){
                        product.decreaseQuantity(res.quantity)
                    }
                    
                    salesOrderItem.push(salesOrderItemFactory.create(res.product_id,res.quantity,res.price))
                    
                })
                
                salesOrder=SalesOrderFactory.create(input.customer_id,input.employee_id,salesOrderItem)
                
                if(input.discount){
                    salesOrder.changeDiscount(input.discount)
                }
                await this.salesOrderRepository.create(salesOrder,products)
            } catch (error) {
                throw error;
            }
       
    }

}