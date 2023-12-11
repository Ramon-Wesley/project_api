import SchedulingServices from "../../schedulingServices/entity/SchedulingServices"
import AppointmentBooking from "./AppointmentBooking"

describe("test the appointment booking entity",()=>{

    it("correctly enter order data",()=>{
        const schedulingServices=new SchedulingServices("123","service1",100)
        const schedulingServices2=new SchedulingServices("321","service2",200)
        const appointmentBooking={
            id:"123",
            customer_id:"123",
            employee_id:"123",
            animal_id:"123",
            date:new Date(),

        }
        const result=new AppointmentBooking(appointmentBooking.customer_id,appointmentBooking.id,appointmentBooking.employee_id,appointmentBooking.animal_id,appointmentBooking.date,[schedulingServices,schedulingServices2])

        expect(result.Id).toBe(appointmentBooking.id)
        expect(result.Employee_id).toBe(appointmentBooking.employee_id)
        expect(result.Animal_id).toBe(appointmentBooking.animal_id)
        expect(result.Date).toBe(appointmentBooking.date)
        expect(result.SchedulingServices.length).toBe(2)
        expect(result.SchedulingServices[0].Id).toBe(schedulingServices.Id)
        expect(result.SchedulingServices[1].Id).toBe(schedulingServices2.Id)
        expect(result.Total).toBe(300)
    })

    it("incorrectly enter order data",()=>{
        const schedulingServices=new SchedulingServices("123","service1",100)
        const schedulingServices2=new SchedulingServices("321","service2",200)
        const appointmentBooking={
            id:" ",
            customer_id:" ",
            employee_id:"  ",
            animal_id:"  ",
            date:new Date("2000-01-01"),

        }
        expect(()=>new AppointmentBooking(appointmentBooking.customer_id,appointmentBooking.id,appointmentBooking.employee_id,appointmentBooking.animal_id,appointmentBooking.date,[schedulingServices,schedulingServices2]))
        .toThrow("appointmentBooking: Invalid AppointmentBooking id services id!,appointmentBooking: Invalid customer id!,appointmentBooking: Invalid employee id!,appointmentBooking: Invalid animal id!,appointmentBooking: Older date than supported!")

    })

    it("inserting empty service schedule",()=>{
 
        const appointmentBooking={
            id:"123",
            customer_id:"123",
            employee_id:"123",
            animal_id:"123",
            date:new Date(),

        }
        expect(()=>new AppointmentBooking(appointmentBooking.customer_id,appointmentBooking.id,appointmentBooking.employee_id,appointmentBooking.animal_id,appointmentBooking.date,[]))
        .toThrow("appointmentBooking: Service schedule cannot be empty!")

    })
})