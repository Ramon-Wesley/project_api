
import Supplier from "../entity/Supplier";
import z, { ZodError, ZodSchema } from "zod"
import ValidatorInterface from "../../@shared/validator/Validator.interface";
import CnpjValidator from "../../@shared/validator/Cnpj.Validator";
import { GenericZodValidator } from "../../@shared/validator/zodValidator/GenericZodValidator";

export default class SupplierZodValidator extends GenericZodValidator<Supplier> implements ValidatorInterface<Supplier> {
  
  validate(entity: Supplier): void {
    super.genericValidate(entity, this.generatedSchema(), "supplier");
  }
  private generatedSchema(): ZodSchema {
        const validation= z.object({
                id:z.string().min(1,"Invalid supplier id!"),
                name:z.string().min(2,"The supplier name must be at least 2 characters long!"),
                cnpj:z.string().refine((value) => CnpjValidator.validate(value),{message:"Invalid CNPJ!"}),
                email:z.string().email({message:"Invalid Email!"}),
                  date_of_birth:z.coerce.date().min(new Date("1900-01-01"),{
                    message:"Older age than supported"
                  }).max(new Date(),{
                    message:"Very young"
                  })
            })
            
            return validation
        }
}