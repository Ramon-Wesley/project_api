import ValidatorInterface from "../../../@shared/validator/Validator.interface";
import z, { ZodError } from "zod";
import AppointmentBooking from "../entity/AppointmentBooking";
export default class AppointmentBookingZodValidator implements ValidatorInterface<AppointmentBooking>{
    validate(entity: AppointmentBooking): void {
        const validator=z.object({
            id:z.string().trim().min(1,"Invalid AppointmentBooking id services id!"),
            employee_id:z.string().trim().min(1,"Invalid employee id!"),
            animal_id:z.string().trim().min(1,"Invalid animal id!"),
            date:z.coerce.date().min(new Date(new Date().toISOString().split('T')[0]) ,{
                message:"Older date than supported!"
              }),
              schedulingServices:z.array(z.object({
                id:z.string().trim().min(1,"Invalid scheduling services id!"),
                name:z.string().trim().min(2,"The schedulingServices name must be at least 2 characters long!"),
                price:z.number().min(0,"The price must not be less than zero!")
              })).refine((value)=>value.length > 0,"Service schedule cannot be empty!"),
              total:z.number().min(0,"The total must not be less than zero!")
        })

        try {
            validator.parse(entity)
        } catch (error) {
            const err=error as ZodError

            err.errors.forEach((res)=>{
                entity.getNotification().insertErrors({
                    context:"appointmentBooking",
                    message:res.message
                })
            })
        }
    }

}