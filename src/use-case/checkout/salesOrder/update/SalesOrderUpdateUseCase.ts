import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import SalesOrderRepositoryInterface from "../../../../domain/checkout/salesOrder/repository/SalesOrder.repository";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/CustomerRepositoryInterface";
import { EmployeeRepositoryInterface } from "../../../../domain/employee/repository/Employee.repository.interface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import SalesOrderUpdateInDto from "./SalesOrderUpdateInDto";
import { SalesOrderFactory } from "../../../../domain/checkout/salesOrder/factory/SalesOrder.factory";
import SalesOrderItemFactory from "../../../../domain/checkout/salesOrder/salesOrder-item/factory/SalesOrder-item.factory";

export default class SalesOrderUpdateUseCase implements useCaseInterface<SalesOrderUpdateInDto,void>{

     
    constructor(
        private readonly salesOrderRepository:SalesOrderRepositoryInterface,
        private readonly productRepository:ProductRepositoryInterface,
        private readonly customerRepository:CustomerRepositoryInterface,
        private readonly employeeRepository:EmployeeRepositoryInterface){
      
     }
    async execute(input: SalesOrderUpdateInDto): Promise<void> {
        try {

            const [customer,employee,salesOrder]=await Promise.all([
                this.customerRepository.findById(input.customer_id),
                this.employeeRepository.findById(input.employee_id),
                this.salesOrderRepository.findById(input.id)
            ])

            const productIds=input.items.map(product=>product.product_id)
            const salesProductIds=salesOrder.SalesOrderItems.map(product=>product.ProductId)
            const allUniqueProductIds=Array.from(new Set([...productIds,...salesProductIds]))

            const products=await this.productRepository.findByIds(allUniqueProductIds)
            

          const salesOrderMap=new Map(salesOrder.SalesOrderItems.map(product=>[product.ProductId,product]))
            const productMap=new Map(products.map(product=>[product.Id,product]));
            
            input.items.forEach((res)=>{
                const existingsales=salesOrderMap.get(res.product_id) 
                const product=productMap.get(res.product_id)
                if(existingsales){
                   
                    const quantityDifference=existingsales?.Quantity-res.quantity
                    if(quantityDifference<0){
                        productMap.get(res.product_id)?.decreaseQuantity(Math.abs(quantityDifference))
                    }
                    if(quantityDifference>0){
                        productMap.get(res.product_id)?.increaseQuantity(quantityDifference)
                    }
                   
                }else if(product){
                    productMap.get(res.product_id)?.decreaseQuantity(res.quantity)
                }

                res.price=productMap.get(res.product_id)?.Price ?? res.price
               

            })
            const salesItemResult=input.items.map((res)=>SalesOrderItemFactory.create(res.product_id,res.quantity,res.price))
            const salesOrderResult=SalesOrderFactory.create(input.customer_id,input.employee_id,salesItemResult,input.date)
            await this.salesOrderRepository.updateById(input.id,salesOrderResult,products)

        } catch (error) {
            throw error
        }
    }

}