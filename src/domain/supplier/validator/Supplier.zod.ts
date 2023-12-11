
import Supplier from "../entity/Supplier";
import z, { ZodError } from "zod"
import ValidatorInterface from "../../@shared/validator/Validator.interface";
import CnpjValidator from "../../@shared/validator/Cnpj.Validator";

export default class SupplierZodValidator implements ValidatorInterface<Supplier>{
    validate(entity: Supplier): void {
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
            

      try {
        validation.parse(entity)
        } catch (error) {
          const err=error as ZodError
          
       err.errors.forEach((res)=>{
         entity.getNotification().insertErrors({
           context:"supplier",
              message:res.message
            })
            })


            
          
        }
    }

}