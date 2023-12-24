import {v4 as uuid} from "uuid"
import AppointmentBooking from "../entity/AppointmentBooking"
import SchedulingServices from "../../schedulingServices/entity/SchedulingServices"

export default class AppointmentBookingFactory{

    static create(customer_id: string, employee_id: string, animal_id: string, date: Date, schedulingServices: SchedulingServices[]){
        return new AppointmentBooking(uuid(),customer_id, employee_id, animal_id, date, schedulingServices);
    }
}