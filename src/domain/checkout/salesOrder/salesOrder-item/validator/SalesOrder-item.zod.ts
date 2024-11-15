import ValidatorInterface from "../../../../@shared/validator/Validator.interface";
import SalesOrderItem from "../entity/SalesOrder-item";
import z, { ZodError } from "zod"
export interface SalesOrderItemInterface{
    id:string,
    salesOrder_id:string,
    product_id:string,
    quantity:number,
    unitaryValue:number,
    total:number
}
export default class SalesOrderItemZodValidator implements ValidatorInterface<SalesOrderItem>{
    validate(entity: SalesOrderItem): void {
       const validation=z.object({
        id:z.string().trim().min(1,"Invalid salesOrder-item id!"),
        product_id:z.string().trim().min(1,"Invalid  product_id!"),
        quantity:z.number().min(1,"SalesOrderItems must have at least 1 item!"),
        unitaryValue:z.number().min(0,"The unit value must not be less than zero!"),
        total:z.number().min(0).min(0,"The total must not be less than zero!"),
       })
       try {
        validation.parse(entity)
       } catch (error) {
        const err= error as ZodError
        err.errors.forEach((res)=>{
            entity.getNotification().insertErrors({
                context:"salesOrder-item",
                message:res.message
            })
        })
       }
    }



}