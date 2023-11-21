
import Customer from "../entity/Customer";
import z, { ZodError } from "zod"
import ValidatorInterface from "../../@shared/validator/Validator.interface";
import CpfValidator from "../../@shared/validator/Cpf.Validator";
export default class CustomerZodValidator implements ValidatorInterface<Customer>{
    validate(entity: Customer): void {
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
            

      try {
        validation.parse({
          name:entity.Name,
          email:entity.Email,
          cpf:entity.Cpf,
          date_of_birth:entity.Date_of_birth
        },)
        } catch (error) {
          const err=error as ZodError
          
       err.errors.forEach((res)=>{
         entity.getNotification().insertErrors({
           context:"customer",
              message:res.message
            })
            })


            
          
        }
    }

}