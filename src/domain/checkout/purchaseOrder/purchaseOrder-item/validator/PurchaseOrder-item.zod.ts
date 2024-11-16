import ValidatorInterface from "../../../../@shared/validator/Validator.interface";
import { GenericZodValidator } from "../../../../@shared/validator/zodValidator/GenericZodValidator";
import PurchaseOrderItem from "../entity/PurchaseOrder-item";
import z, { ZodError, ZodSchema } from "zod"
export interface PurchaseOrderItemInterface{
    id:string,
    purchaseOrder_id:string,
    product_id:string,
    quantity:number,
    unitaryValue:number,
    total:number
}
export default class PurchaseOrderItemZodValidator extends GenericZodValidator<PurchaseOrderItem> implements ValidatorInterface<PurchaseOrderItem> {
  
    validate(entity: PurchaseOrderItem): void {
        super.genericValidate(entity, this.generatedSchema(), "purchaseOrder-item");
      }
      private generatedSchema(): ZodSchema {
       const validation=z.object({
        id:z.string().trim().min(1,"Invalid purchaseOrder-item id!"),
        product_id:z.string().trim().min(1,"Invalid  product_id!"),
        quantity:z.number().min(1,"purchaseOrderItems must have at least 1 item!"),
        unitaryValue:z.number().min(0,"The unit value must not be less than zero!"),
        total:z.number().min(0).min(0,"The total must not be less than zero!"),
       })

       return validation
      }

}
       