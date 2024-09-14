
import ValidatorInterface from "../../@shared/validator/Validator.interface";
import z, { ZodError } from "zod"
import { User } from "../entity/User";

export class UserZodValidator implements ValidatorInterface<User>{
    validate(entity: User): void {

        const validation= z.object({
            id:z.string().min(1,"Invalid user id!"),
            name:z.string().min(2,"The user name must be at least 2 characters long!"),
            email:z.string().email({message:"Invalid Email!"}),
            password:z.string().min(8,"The password must be at least 6 characters long!"),
            isActive:z.boolean(),
            roles: z.enum(["ADMIN", "EMPLOYEE"], {
              errorMap: () => ({ message: "Invalid role!" }),
            })
        })       

  try {
    validation.parse(entity)
    } catch (error) {
      const err=error as ZodError
      
   err.errors.forEach((res)=>{
     entity.getNotification().insertErrors({
       context:"user",
          message:res.message
        })
        })


        
      
    }
    }


}