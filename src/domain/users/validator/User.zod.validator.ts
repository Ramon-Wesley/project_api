
import ValidatorInterface from "../../@shared/validator/Validator.interface";
import z, { ZodError, ZodSchema } from "zod"
import { User } from "../entity/User";
import { GenericZodValidator } from "../../@shared/validator/zodValidator/GenericZodValidator";

export class UserZodValidator extends GenericZodValidator<User>  implements ValidatorInterface<User>{
  validate(entity: User): void {
    super.genericValidate(entity, this.generatedSchema(), "user");
  }
  private generatedSchema(): ZodSchema {

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

        return validation
    }
}