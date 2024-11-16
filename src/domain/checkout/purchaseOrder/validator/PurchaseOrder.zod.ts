import { PurchaseOrderItemInterface } from '../purchaseOrder-item/validator/PurchaseOrder-item.zod';
import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import PurchaseOrder from "../entity/PurchaseOrder";
import z, { ZodError, ZodSchema } from "zod"
import PurchaseOrderItem from '../purchaseOrder-item/entity/PurchaseOrder-item';
import { GenericZodValidator } from '../../../@shared/validator/zodValidator/GenericZodValidator';

export default class PurchaseOrderZodValidator extends GenericZodValidator<PurchaseOrder> implements ValidatorInterface<PurchaseOrder> {

    validate(entity: PurchaseOrder): void {
        super.genericValidate(entity, this.generatedSchema(), "purchaseOrder");
      }
      private generatedSchema(): ZodSchema {
       const validation=z.object({
        id:z.string().trim().min(1,"Invalid purchaseOrder id!"),
        supplier_id:z.string().refine((value)=>value.trim().length > 0,"Invalid Supplier_id!"),
        employee_id:z.string().refine((value)=>value.trim().length > 0,"Invalid Employee_id!"), 
        data:z.date({description:"The date must be in the format YYYY-MM-DD"}),
        total:z.number().min(0),
        discount:z.number().min(0)
       })

       return validation
      }
}