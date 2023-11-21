import { PurchaseOrderItemInterface } from './../purchaseOrder-item/validator/PurchaseOrder-item.zod';
import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import PurchaseOrder from "../entity/PurchaseOrder";
import z, { ZodError } from "zod"
import PurchaseOrderItem from '../purchaseOrder-item/entity/PurchaseOrder-item';

export default class PurchaseOrderZodValidator implements ValidatorInterface<PurchaseOrder>{
    validate(entity: PurchaseOrder): void {
       const validation=z.object({
        id:z.string().trim().min(1,"Invalid purchaseOrder id!"),
        customer_id:z.string().refine((value)=>value.trim().length > 0,"Invalid Customer_id!"),
        employee_id:z.string().refine((value)=>value.trim().length > 0,"Invalid Employee_id!"),
         data:z.date(), 
        purchaseOrderItems:z.array(z.object({
            id:z.string().trim().min(1,"Invalid purchaseOrder-item id!"),
            purchaseOrder_id:z.string().trim().min(1,"Invalid purchaseOrder id!"),
            product_id:z.string().trim().min(1,"Invalid  product_id!"),
            quantity:z.number().min(1,"PurchaseOrderItems must have at least 1 item!"),
            unitaryValue:z.number().min(0,"The unit value must not be less than zero!"),
            total:z.number().min(0).min(0,"The total must not be less than zero!"),
        })).refine((value)=>value.length > 0),
        total:z.number().min(0,"The total must not be less than zero!"),
        discount:z.number().min(0,"The discout must not be less than zero!")
        .max(100,"The discount must not be more than 100%!")
       })

       try {
        validation.parse(entity)
       } catch (error) {
        const err=error as ZodError
        err.errors.forEach((res)=>{
            entity.getNotification().insertErrors({
                context:"purchaseOrder",
                message:res.message
            })
        })
       }
    }

}