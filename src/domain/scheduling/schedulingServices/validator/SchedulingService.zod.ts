import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import SchedulingServices from "../entity/SchedulingServices";
import z, { ZodError } from "zod"
export default class SchedulingZodValidator implements ValidatorInterface<SchedulingServices>{
    validate(entity: SchedulingServices): void {
       const validation=z.object({
        id:z.string().trim().min(1,"Invalid scheduling services id!"),
        name:z.string().trim().min(2,"The schedulingServices name must be at least 2 characters long!"),
        price:z.number().min(0,"The price must not be less than zero!")
       })

try {
    validation.parse(entity)
} catch (error) {
    const err=error as ZodError
    err.errors.forEach((res)=>{
        entity.getNotification().insertErrors({
            context:"schedulingServices",
            message:res.message
        })
    })
}
    }

}