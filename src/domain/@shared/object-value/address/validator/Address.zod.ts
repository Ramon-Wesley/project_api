import BrazilianZipCodeValidator from "../../../validator/Brazilian.ZipCode.Validator";
import ValidatorInterface from "../../../validator/Validator.interface";
import { GenericZodValidator } from "../../../validator/zodValidator/GenericZodValidator";
import Address from "../Address";
import z, { ZodError, ZodSchema } from "zod"


export default class AddressZodValidator extends GenericZodValidator<Address> implements ValidatorInterface<Address>{


    validate(entity: Address): void {
        super.genericValidate(entity, this.generatedSchema(), "address");
      }

      private generatedSchema(): ZodSchema {
       const validation=z.object({
         uf:z.string().min(2).max(2),
         city:z.string(),
         neighborhood:z.string(),
         zipCode:z.string().refine((value)=>BrazilianZipCodeValidator.validate(value),"invalid ZipCode!"),
         street:z.string().min(1),
         number:z.string().min(1),
         description:z.string()
       })
       return validation
      }

}