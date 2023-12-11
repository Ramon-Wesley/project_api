import Entity from "../../../@shared/entity/Entity";
import NotificationError from "../../../@shared/notification/NotificationError";
import SchedulingServices from "../../schedulingServices/entity/SchedulingServices";
import AppointmentBookingFactoryValidator from "../factory/AppointmentBooking.factory.validator";

export default class AppointmentBooking extends Entity{

    private customer_id:string;
    private animal_id:string;
    private employee_id:string;
    private date:Date;
    private schedulingServices:SchedulingServices[];
    private total:number;

    constructor(id:string,customer_id:string,employee_id:string,animal_id:string,date:Date,schedulingServices:SchedulingServices[]){
            super(id)
            this.customer_id=customer_id
            this.employee_id=employee_id;
            this.animal_id=animal_id;
            this.date=date;
            this.schedulingServices=schedulingServices;
            this.total=this.getTotalValue();
            this.validate()
    }

    private validate(){
        AppointmentBookingFactoryValidator.create()
        .validate(this)
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }
    changeEmployee_id(employee_id:string){
        this.employee_id=employee_id
        this.validate()
    }
    changeAnimal_id(animal_id:string){
        this.animal_id=animal_id
        this.validate()
    }
    changeDate(date:Date){
        this.date=date
        this.validate()
    }

    changeSchedulingServices(schedulingServices:SchedulingServices[]){
        this.schedulingServices=schedulingServices;
        this.validate()
    }
    private getTotalValue(){
        const lenght=this.schedulingServices.length;
        let sum=0;
        if(lenght > 0){
            sum=this.schedulingServices.reduce((prev,current)=>prev+current.Price,0)
        }
        return sum;
    }

    get Total(){
        return this.total;

    }
    get Employee_id(){
        return this.employee_id;
    }

    get Animal_id(){
        return this.animal_id;
    }
    get Date(){
        return this.date;
    }
    get SchedulingServices(){
        return this.schedulingServices;
    }
    get Id(){
        return this.id
    }
    }
