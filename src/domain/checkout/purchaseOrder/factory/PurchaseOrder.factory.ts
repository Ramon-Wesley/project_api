import {v4 as uuid} from "uuid"
import PurchaseOrder from "../entity/PurchaseOrder"
import PurchaseOrderItem from "../purchaseOrder-item/entity/PurchaseOrder-item"

export class PurchaseOrderFactory{

static create(customer_id:string,employee_id:string,purchaseOrderItems:PurchaseOrderItem[]):PurchaseOrder{
        const id=uuid()
        return new PurchaseOrder(id,customer_id,employee_id,purchaseOrderItems)
    }
}