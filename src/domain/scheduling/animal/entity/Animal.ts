import Entity from "../../../@shared/entity/Entity";
import NotificationError from "../../../@shared/notification/NotificationError";
import AnimalFactoryValidation from "../factory/Animal.factory.validate";

export default class Animal extends Entity{
    
    private customer_id:string;
    private name:string;
    private race_id:string;
    private weight:number;
    private date_of_birth:Date;

    constructor(id:string,customer_id:string,name:string,race_id:string,weight:number,date_of_birth:Date){
        super(id);
        this.customer_id=customer_id;
        this.name=name;
        this.race_id=race_id;
        this.weight=weight;
        this.date_of_birth=date_of_birth
        this.validate()
    }
    validate(){
        AnimalFactoryValidation.create()
        .validate(this)
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get Id(){
        return this.id
    }
    get Customer_id(){
        return this.customer_id
    }
    get Name(){
        return this.name
    }
    get Weight(){
        return this.weight
    } 
    get Race_id(){
        return this.race_id
    }
    get Date_of_birth(){
        return this.date_of_birth
    }

    changeCustomer_id(customer_id:string){
        this.customer_id=customer_id;
    }
    
    changeName(name:string){
        this.name=name
        this.validate()
    }
    changeWeight(weight:number){
        this.weight=weight
        this.validate()
    }
    changeRace_id(race_id:string){
        this.race_id=race_id;
    }
    changeDate_of_birth(date_of_birth:Date){
       this.date_of_birth=date_of_birth
       this.validate()
    }
}