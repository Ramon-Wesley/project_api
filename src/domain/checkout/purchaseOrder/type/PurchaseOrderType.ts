import PurchaseOrderItem from "../purchaseOrder-item/entity/PurchaseOrder-item"
import { TPurchaseOrderItem } from "../purchaseOrder-item/type/PurchaseOrder-item.type"

export type TPurchaseOrder={
    id:string,
    customer_id:string,
    employee_id:string,
    purchaseOrderItems:PurchaseOrderItem[]
    total:number,
    discount:number,
}