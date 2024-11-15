import ValidatorInterface from "../../../validator/Validator.interface";
import { RefreshToken } from "../RefreshToken";
import z, { ZodError } from "zod"

    export class RefreshTokenZodValidator implements ValidatorInterface<RefreshToken>{
        validate(entity: RefreshToken): void {
          console.log(entity)
            const validation= z.object({
                token:z.string().trim().min(1,"Invalid refresh token expiresIn!"),
                expiresIn:z.date().min(new Date(),"Invalid refresh token expiresIn!")
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