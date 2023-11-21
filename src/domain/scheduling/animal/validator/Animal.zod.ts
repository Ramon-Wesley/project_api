import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import Animal from "../entity/Animal";
import z, { ZodError } from "zod"

export default class AnimalZodValidator implements ValidatorInterface<Animal>{
    validate(entity: Animal): void {
        const validation=z.object({
             id:z.string().trim().min(1,"Invalid animal id!"),
             customer_id:z.string().trim().min(1,"Invalid customer_id!"),
             name:z.string().trim().min(2,"The animal's name must be at least 2 characters long!"),
             race_id:z.string().trim().min(1,"Invalid race_id!"),
             weight:z.number().min(0,"Invalid animal weight!"),
             date_of_birth:z.coerce.date().min(new Date("1900-01-01"),{
                message:"Older age than supported!"
              })
        })
        try {
            validation.parse(entity)
        } catch (error) {
            const err= error as ZodError
            err.errors.forEach((res)=>{
                entity.getNotification().insertErrors({
                    context:"animal",
                    message:res.message
                })
            })
        }
    }



}