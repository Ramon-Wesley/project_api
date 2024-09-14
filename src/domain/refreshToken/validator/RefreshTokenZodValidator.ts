import ValidatorInterface from "../../@shared/validator/Validator.interface";
import { RefreshToken } from "../entity/RefreshToken";
import z, { ZodError } from "zod"

    export class RefreshTokenZodValidator implements ValidatorInterface<RefreshToken>{
        validate(entity: RefreshToken): void {
          console.log(entity)
            const validation= z.object({
                id:z.string().trim().min(1,"Invalid refresh token id!"),
                expiresIn:z.string().trim().min(1,"Invalid refresh token expiresIn!"),
                userId:z.string() .trim().min(1,"Invalid refresh token user_id!")
            })
            
            try {
                validation.parse(entity)
                } catch (error) {
                  const err=error as ZodError
                  
               err.errors.forEach((res)=>{
                 entity.getNotification().insertErrors({
                   context:"RefreshToken",
                      message:res.message
                    })
                    })
            
            
                    
                  
                }
        }
    }