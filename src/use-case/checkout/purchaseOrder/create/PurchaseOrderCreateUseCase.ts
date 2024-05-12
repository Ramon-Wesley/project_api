import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import PurchaseOrder from "../../../../domain/checkout/purchaseOrder/entity/PurchaseOrder";
import { PurchaseOrderFactory } from "../../../../domain/checkout/purchaseOrder/factory/PurchaseOrder.factory";
import PurchaseOrderItem from "../../../../domain/checkout/purchaseOrder/purchaseOrder-item/entity/PurchaseOrder-item";
import PurchaseOrderItemFactory from "../../../../domain/checkout/purchaseOrder/purchaseOrder-item/factory/PurchaseOrder-item.factory";
import PurchaseOrderRepositoryInterface from "../../../../domain/checkout/purchaseOrder/repository/PurchaseOrder.repossitory";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/CustomerRepositoryInterface";
import { EmployeeRepositoryInterface } from "../../../../domain/employee/repository/Employee.repository.interface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import PurchaseOrderCreateInDto from "./PurchaseOrderCreateInDto";

export default class PurchaseOrderCreateUseCase implements useCaseInterface<PurchaseOrderCreateInDto,void>{
   private purchaseOrderRepository:PurchaseOrderRepositoryInterface;
   private productRepository:ProductRepositoryInterface;
   private customerRepository:CustomerRepositoryInterface;
   private employeeRepository:EmployeeRepositoryInterface;
    
   constructor(purchaseOrderRepository:PurchaseOrderRepositoryInterface,productRepository:ProductRepositoryInterface,customerRepository:CustomerRepositoryInterface,employeeRepository:EmployeeRepositoryInterface){
        this.purchaseOrderRepository=purchaseOrderRepository;
        this.productRepository=productRepository;
        this.customerRepository=customerRepository;
        this.employeeRepository=employeeRepository
    }

   async execute(input: PurchaseOrderCreateInDto): Promise<void> {
        try {
            let purchaseOrderItem:PurchaseOrderItem[]=[];
            let purchaseOrder:PurchaseOrder;
            const customer=await this.customerRepository.findById(input.customer_id)
            const employee=await this.employeeRepository.findById(input.employee_id)
            const productIds=input.items.map(product=>product.product_id)
            const products=await this.productRepository.findByIds(productIds)
            
            input.items.forEach((res)=>{
                products.forEach((res2)=>{
                    if(res.product_id===res2.Id){
                        res2.decreaseQuantity(res.quantity)
                    }
                })
                purchaseOrderItem.push(PurchaseOrderItemFactory.create(res.product_id,res.quantity,res.price))
        
            })

            purchaseOrder=PurchaseOrderFactory.create(input.customer_id,input.employee_id,purchaseOrderItem)
            
            if(input.discount){
                purchaseOrder.changeDiscount(input.discount)
            }
            await this.purchaseOrderRepository.create(purchaseOrder,products)
        } catch (error) {
            throw error;
        }
       
    }

}