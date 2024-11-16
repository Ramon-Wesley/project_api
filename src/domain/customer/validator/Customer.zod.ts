import z, { ZodSchema } from "zod";
import Customer from "../entity/Customer";
import CpfValidator from "../../@shared/validator/Cpf.Validator";
import { GenericZodValidator } from "../../@shared/validator/zodValidator/GenericZodValidator";
import ValidatorInterface from "../../@shared/validator/Validator.interface";

export default class CustomerZodValidator extends GenericZodValidator<Customer> implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    super.genericValidate(entity, this.generatedSchema(), "customer");
  }

  private generatedSchema(): ZodSchema {
    const validation= z.object({
      id:z.string().trim().min(1,"Invalid customer id!"),
      name:z.string().min(2,"The customer name must be at least 2 characters long!"),
      cpf:z.string().refine((value) => CpfValidator.validate(value),{message:"Invalid CPF!"}),
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
