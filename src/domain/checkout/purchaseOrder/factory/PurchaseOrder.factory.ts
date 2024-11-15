import {v4 as uuid} from "uuid"
import PurchaseOrder from "../entity/PurchaseOrder"
import PurchaseOrderItem from "../purchaseOrder-item/entity/PurchaseOrder-item"

export class PurchaseOrderFactory{

static create(supplier_id:string,employee_id:string,purchaseOrderItems:PurchaseOrderItem[]):PurchaseOrder{
        const id=uuid()
        return new PurchaseOrder(id,supplier_id,employee_id,purchaseOrderItems)
    }
}