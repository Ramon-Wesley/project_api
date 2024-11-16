import e from "express";
import ProductRepositoryInterface from "../../../../domain/checkout/products/repository/ProdoctRepositoryInterface";
import purchaseOrderRepositoryInterface from "../../../../domain/checkout/purchaseOrder/repository/PurchaseOrder.repository";
import SupplierRepositoryInterface from "../../../../domain/supplier/repository/SupplierRepositoryInterface";
import { EmployeeRepositoryInterface } from "../../../../domain/employee/repository/Employee.repository.interface";
import useCaseInterface from "../../../@shared/UseCaseInterface";
import PurchaseOrderUpdateInDto from "./PurchaseOrderUpdateInDto";
import { PurchaseOrderFactory } from "../../../../domain/checkout/purchaseOrder/factory/PurchaseOrder.factory";
import purchaseOrderItemFactory from "../../../../domain/checkout/purchaseOrder/purchaseOrder-item/factory/PurchaseOrder-item.factory";
import { ErrorResponseMessage } from "../../../../infrastructure/api/routes/@shared/ErrorResponseMessage";

export default class PurchaseOrderUpdateUseCase implements useCaseInterface<PurchaseOrderUpdateInDto,void>{

     
    constructor(
        private readonly purchaseOrderRepository:purchaseOrderRepositoryInterface,
        private readonly productRepository:ProductRepositoryInterface,
        private readonly supplierRepository:SupplierRepositoryInterface,
        private readonly employeeRepository:EmployeeRepositoryInterface){
      
     }
    async execute(input: PurchaseOrderUpdateInDto): Promise<void> {
        try {

            const [supplier,employee,purchaseOrder]=await Promise.all([
                this.supplierRepository.findById(input.supplier_id),
                this.employeeRepository.findById(input.employee_id),
                this.purchaseOrderRepository.findById(input.id)
            ])

            const productIds=input.items.map(product=>product.product_id)
            const purchaseProductIds=purchaseOrder.PurchaseOrderItems.map(product=>product.ProductId)
            const allUniqueProductIds=Array.from(new Set([...productIds,...purchaseProductIds]))

            const products=await this.productRepository.findByIds(allUniqueProductIds)
            

          const purchaseOrderMap=new Map(purchaseOrder.PurchaseOrderItems.map(product=>[product.ProductId,product]))
            const productMap=new Map(products.map(product=>[product.Id,product]));
            
            input.items.forEach((res)=>{
                const existingpurchase=purchaseOrderMap.get(res.product_id) 
                const product=productMap.get(res.product_id)
                if(existingpurchase){
                   
                    const quantityDifference=existingpurchase?.Quantity-res.quantity
                    if(quantityDifference<0){
                        productMap.get(res.product_id)?.increaseQuantity(Math.abs(quantityDifference))
                    }
                    if(quantityDifference>0){
                        productMap.get(res.product_id)?.decreaseQuantity(quantityDifference)
                    }
                   
                }else if(product){
                    productMap.get(res.product_id)?.increaseQuantity(res.quantity)
                }

           

            })
            console.log("________________++++________-----__________________")
            console.log(input)
            const purchaseItemResult=input.items.map((res)=>purchaseOrderItemFactory.create(res.product_id,res.quantity,res.price))
            const purchaseOrderResult=PurchaseOrderFactory.create(input.supplier_id,input.employee_id,purchaseItemResult,input.date)
            await this.purchaseOrderRepository.updateById(input.id,purchaseOrderResult,products)

        } catch (error) {
            
            throw error
        }
    }

}