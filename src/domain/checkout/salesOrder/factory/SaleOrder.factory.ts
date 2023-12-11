import {v4 as uuid} from "uuid"
import SaleOrder from "../entity/SaleOrder"
import SaleOrderItem from "../saleOrder-item/entity/SaleOrder-item"

export class SaleOrderFactory{

static create(supplier_id:string,employee_id:string,saleOrderItems:SaleOrderItem[]):SaleOrder{
        const id=uuid()
        return new SaleOrder(id,supplier_id,employee_id,saleOrderItems)
    }
}