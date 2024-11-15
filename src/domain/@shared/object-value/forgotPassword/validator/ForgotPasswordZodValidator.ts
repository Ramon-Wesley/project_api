import ValidatorInterface from "../../../validator/Validator.interface";

import z, { ZodError } from "zod"
import { ForgotPassword } from "../ForgotPassword";
export class ForgotPasswordZodValidator  implements ValidatorInterface<ForgotPassword> {
    validate(entity: ForgotPassword): void {

        const validation= z.object({
            token:z.string().trim().min(1,"Invalid refresh token expiresIn!"),
            expiresIn:z.date().min(new Date(),"Invalid refresh token expiresIn!"),
            numberEmailIdentification:z.string().trim().min(6,"Invalid numberEmailIdentification!")
        })
        
        try {
            validation.parse(entity)
            } catch (error) {
              const err=error as ZodError
              
           err.errors.forEach((res)=>{
             entity.getNotification().insertErrors({
               context:"ForgotPassword",
                  message:res.message
                })
                })
    }
 
}


}