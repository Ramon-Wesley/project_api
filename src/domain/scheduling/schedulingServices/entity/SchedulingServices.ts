import Entity from "../../../@shared/entity/Entity";
import NotificationError from "../../../@shared/notification/NotificationError";
import SchedulingServiceValidator from "../factory/SchedulingService.factory.validator";

export default class SchedulingServices extends Entity{

    private name:string;
    private price:number;
    
    constructor(id:string,name:string,price:number){
        super(id)
        this.name=name;
        this.price=price;
        this.validate()
    }

    private validate(){
        SchedulingServiceValidator.create()
        .validate(this)
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }
    changeName(name:string){
        this.name=name;
        this.validate();
    }
    changePrice(price:number){
        this.price=price
        this.validate()
    }

    get Name(){
        return this.name
    }
    get Price(){
        return this.price
    }
    get Id(){
        return this.id
    }
} 