import { SalesOrderItemInterface } from '../salesOrder-item/validator/SalesOrder-item.zod';
import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import SalesOrder from "../entity/SalesOrder";
import z, { ZodError, ZodSchema } from "zod"
import SalesOrderItem from '../salesOrder-item/entity/SalesOrder-item';
import { GenericZodValidator } from '../../../@shared/validator/zodValidator/GenericZodValidator';

export default class SalesOrderZodValidator extends GenericZodValidator<SalesOrder> implements ValidatorInterface<SalesOrder> {
    
    validate(entity: SalesOrder): void {
        super.genericValidate(entity, this.generatedSchema(), "salesOrder");
      }
      private generatedSchema(): ZodSchema {
       const validation=z.object({
        id:z.string().trim().min(1,"Invalid salesOrder id!"),
        customer_id:z.string().trim().min(1,"Invalid Customer_id!"),
        employee_id:z.string().trim().min(1,"Invalid Employee_id!"),
         data:z.date(), 
        salesOrderItems:z.array(z.object({
            id:z.string().trim().min(1,"Invalid salesOrder-item id!"),
            product_id:z.string().trim().min(1,"Invalid  product_id!"),
            quantity:z.number().min(1,"salesOrderItems must have at least 1 item!"),
            unitaryValue:z.number().min(0,"The unit value must not be less than zero!"),
            total:z.number().min(0).min(0,"The total must not be less than zero!"),
        })).refine((value)=>value.length > 0,"The salesItems must not be less than zero!"),
        total:z.number().min(0,"The total must not be less than zero!")
       })

       return validation
      }
}