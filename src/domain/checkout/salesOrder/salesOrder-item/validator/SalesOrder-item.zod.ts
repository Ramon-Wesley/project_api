import ValidatorInterface from "../../../../@shared/validator/Validator.interface";
import { GenericZodValidator } from "../../../../@shared/validator/zodValidator/GenericZodValidator";
import SalesOrderItem from "../entity/SalesOrder-item";
import z, { ZodError, ZodSchema } from "zod"
export interface SalesOrderItemInterface{
    id:string,
    salesOrder_id:string,
    product_id:string,
    quantity:number,
    unitaryValue:number,
    total:number
}
export default class SalesOrderItemZodValidator extends GenericZodValidator<SalesOrderItem> implements ValidatorInterface<SalesOrderItem>{
    
    validate(entity: SalesOrderItem): void {
        super.genericValidate(entity, this.generatedSchema(), "salesOrder-item");
      }
      private generatedSchema(): ZodSchema {
       const validation=z.object({
        id:z.string().trim().min(1,"Invalid salesOrder-item id!"),
        product_id:z.string().trim().min(1,"Invalid  product_id!"),
        quantity:z.number().min(1,"SalesOrderItems must have at least 1 item!"),
        unitaryValue:z.number().min(0,"The unit value must not be less than zero!"),
        total:z.number().min(0).min(0,"The total must not be less than zero!"),
       })

       return validation
      }
}