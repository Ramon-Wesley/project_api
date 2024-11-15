import SalesOrderItem from "../salesOrder-item/entity/SalesOrder-item"
import { TSalesOrderItem } from "../salesOrder-item/type/SalesOrder-item.type"

export type TSalesOrder={
    id:string,
    customer_id:string,
    employee_id:string,
    salesOrderItems:SalesOrderItem[]
    total:number,
    discount:number,
}