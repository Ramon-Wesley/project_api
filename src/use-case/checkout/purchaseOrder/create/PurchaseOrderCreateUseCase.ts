import { Queue } from "bullmq";
import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import purchaseOrder from "../../../../domain/checkout/purchaseOrder/entity/PurchaseOrder";
import { PurchaseOrderFactory } from "../../../../domain/checkout/purchaseOrder/factory/PurchaseOrder.factory";
import purchaseOrderItem from "../../../../domain/checkout/purchaseOrder/purchaseOrder-item/entity/PurchaseOrder-item";
import purchaseOrderItemFactory from "../../../../domain/checkout/purchaseOrder/purchaseOrder-item/factory/PurchaseOrder-item.factory";
import purchaseOrderRepositoryInterface from "../../../../domain/checkout/purchaseOrder/repository/PurchaseOrder.repository";
import SupplierRepositoryInterface from "../../../../domain/supplier/repository/SupplierRepositoryInterface";
import { EmployeeRepositoryInterface } from "../../../../domain/employee/repository/Employee.repository.interface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import PurchaseOrderCreateInDto from "./PurchaseOrderCreateInDto";
import { QueueFactory } from "../../../../infrastructure/queue/factory/QueueFactory";

export default class PurchaseOrderCreateUseCase implements useCaseInterface<PurchaseOrderCreateInDto,void>{

   constructor(
    private readonly purchaseOrderRepository:purchaseOrderRepositoryInterface,
    private readonly productRepository:ProductRepositoryInterface,
    private readonly supplierRepository:SupplierRepositoryInterface,
    private readonly employeeRepository:EmployeeRepositoryInterface){
    }

   async execute(input: PurchaseOrderCreateInDto): Promise<void> {
        try {
      
                let purchaseOrderItem:purchaseOrderItem[]=[];
                let purchaseOrder:purchaseOrder;
                const productIds=input.items.map(product=>product.product_id)
                
                const [supplier,employee,products]=await Promise.all([
                    this.supplierRepository.findById(input.supplier_id),
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
                        product.increaseQuantity(res.quantity)
                        res.price=product.Price
                    }
                    
                    purchaseOrderItem.push(purchaseOrderItemFactory.create(res.product_id,res.quantity,res.price))
                    
                })
                
                purchaseOrder=PurchaseOrderFactory.create(input.supplier_id,input.employee_id,purchaseOrderItem)
                
                if(input.discount){
                    purchaseOrder.changeDiscount(input.discount)
                }
                await this.purchaseOrderRepository.create(purchaseOrder,products)
            } catch (error) {
                throw error;
            }
       
    }

}