import {v4 as uuid} from "uuid"
import SalesOrder from "../entity/SalesOrder"
import SalesOrderItem from "../salesOrder-item/entity/SalesOrder-item"

export class SalesOrderFactory{

static create(customer_id:string,employee_id:string,salesOrderItems:SalesOrderItem[]):SalesOrder{
        const id=uuid()
        return new SalesOrder(id,customer_id,employee_id,salesOrderItems)
    }
}