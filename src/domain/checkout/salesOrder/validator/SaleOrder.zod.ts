import { SaleOrderItemInterface } from '../saleOrder-item/validator/SaleOrder-item.zod';
import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import SaleOrder from "../entity/SaleOrder";
import z, { ZodError } from "zod"
import SaleOrderItem from '../saleOrder-item/entity/SaleOrder-item';

export default class SaleOrderZodValidator implements ValidatorInterface<SaleOrder>{
    validate(entity: SaleOrder): void {
       const validation=z.object({
        id:z.string().trim().min(1,"Invalid saleOrder id!"),
        supplier_id:z.string().refine((value)=>value.trim().length > 0,"Invalid Supplier_id!"),
        employee_id:z.string().refine((value)=>value.trim().length > 0,"Invalid Employee_id!"), data:z.date(), 
        saleOrderItems:z.array(z.object({
            id:z.string().trim().min(1,"Invalid saleOrder-item id!"),
            product_id:z.string().trim().min(1,"Invalid  product_id!"),
            quantity:z.number().min(1,"SaleOrderItems must have at least 1 item!"),
            unitaryValue:z.number().min(0,"The unit value must not be less than zero!"),
            total:z.number().min(0).min(0,"The total must not be less than zero!"),
        })).refine((value)=>value.length > 0,"SaleOrderItems must have at least 1 item!"),
        total:z.number().min(0),
       discount:z.number().min(0)
       })

       try {
        validation.parse(entity)
       } catch (error) {
        const err=error as ZodError
        err.errors.forEach((res)=>{
            entity.getNotification().insertErrors({
                context:"saleOrder",
                message:res.message
            })
        })
       }
    }

}