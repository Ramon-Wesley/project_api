import AppointmentBookingZodValidator from "../validator/AppointmentBooking.zod";

export default class AppointmentBookingFactoryValidator{

    public static create(){
        return new AppointmentBookingZodValidator();
    }
}