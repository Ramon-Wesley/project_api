
import z, { ZodError } from "zod"
import ValidatorInterface from "../../@shared/validator/Validator.interface";
import CpfValidator from "../../@shared/validator/Cpf.Validator";
import Employee from "../entity/Employee";
export default class EmployeeZodValidator implements ValidatorInterface<Employee>{
    validate(entity: Employee): void {
        const validation= z.object({
                id:z.string().min(1,"Invalid employee id!"),
                name:z.string().min(2,"The employee name must be at least 2 characters long!"),
                ra:z.string().min(8,"Invalid RA! Ra must have exactly 8 characters").max(8,"Invalid RA! Ra must have exactly 8 characters"),
                email:z.string().email({message:"Invalid Email!"}),
                  date_of_birth:z.coerce.date().min(new Date("1900-01-01"),{
                    message:"Older age than supported!"
                  }).max(new Date(),{
                    message:"Very young!"
                  })
            })
            

      try {
        validation.parse(entity)
        } catch (error) {
          const err=error as ZodError
          
       err.errors.forEach((res)=>{
         entity.getNotification().insertErrors({
           context:"employee",
              message:res.message
            })
            })


            
          
        }
    }

}