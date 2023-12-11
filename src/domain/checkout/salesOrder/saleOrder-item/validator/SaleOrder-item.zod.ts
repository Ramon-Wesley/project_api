import ValidatorInterface from "../../../../@shared/validator/Validator.interface";
import SaleOrderItem from "../entity/SaleOrder-item";
import z, { ZodError } from "zod"
export interface SaleOrderItemInterface{
    id:string,
    saleOrder_id:string,
    product_id:string,
    quantity:number,
    unitaryValue:number,
    total:number
}
export default class SaleOrderItemZodValidator implements ValidatorInterface<SaleOrderItem>{
    validate(entity: SaleOrderItem): void {
       const validation=z.object({
        id:z.string().trim().min(1,"Invalid saleOrder-item id!"),
        product_id:z.string().trim().min(1,"Invalid  product_id!"),
        quantity:z.number().min(1,"saleOrderItems must have at least 1 item!"),
        unitaryValue:z.number().min(0,"The unit value must not be less than zero!"),
        total:z.number().min(0).min(0,"The total must not be less than zero!"),
       })
       try {
        validation.parse(entity)
       } catch (error) {
        const err= error as ZodError
        err.errors.forEach((res)=>{
            entity.getNotification().insertErrors({
                context:"saleOrder-item",
                message:res.message
            })
        })
       }
    }



}