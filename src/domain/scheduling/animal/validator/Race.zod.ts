import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import z, { ZodError } from "zod"
import Race from "../entity/Race";

export default class RaceZodValidator implements ValidatorInterface<Race>{
    validate(entity: Race): void {
        const validation=z.object({
             id:z.string().trim().min(1,"Invalid race id!"),
             name:z.string().trim().min(2,"The race's name must be at least 2 characters long!"),
        })
        try {
            validation.parse(entity)
        } catch (error) {
            const err= error as ZodError
            err.errors.forEach((res)=>{
                entity.getNotification().insertErrors({
                    context:"race",
                    message:res.message
                })
            })
        }
    }



}