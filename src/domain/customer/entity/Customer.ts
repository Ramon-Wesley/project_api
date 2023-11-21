import Entity from "../../@shared/entity/Entity";
import uuid from "uuid"
import Address from "../object-value/Address";
import Notification from "../../@shared/notification/Notification";
import NotificationError from "../../@shared/notification/NotificationError";
import CustomerFactoryValidator from "../factory/CustomerFactoryValidator";

export default class Customer extends Entity{

    private name:string;
    private cpf:string;
    private email:string;
    private date_of_birth:Date;
    private address?:Address;
    private isActive:boolean=true;

    constructor( 
        id:string,
        name:string,
        cpf:string,
        email:string,
        date_of_birth:Date){
        super(id)
        this.name=name;
        this.cpf=cpf;
        this.email=email;
        this.date_of_birth=date_of_birth;
        this.validate();
        
        }
    activate(){
        this.isActive=true;
    }

    disable(){
        this.isActive=false;
    }


        validate(){
            CustomerFactoryValidator
            .create()
            .validate(this) 
            if(this.notification.hasErrors()){
              throw new NotificationError(this.notification.getErrors())
          }   
        }

        changeAddress(address:Address){
        this.address=address;
        }
        
        changeName(name:string){
            this.name=name;
            this.validate();
        }
        changeCPF(cpf:string){
            this.cpf=cpf;
            this.validate()
        }
      changeEmail(email:string){
        this.email=email;
        this.validate()
      }
      changeDate_of_birth(date:Date){
        this.date_of_birth=date;
        this.validate()
      }

      get Name(){
        return this.name;
      }
      get Cpf(){
        return this.cpf
      }
      get Email(){
        return this.email
      }
      get Date_of_birth(){
        return this.date_of_birth;
      }
      get IsActive(){
        return this.isActive;
      }
      get Address(){
        return this.address
      }
      get Id(){
        return this.id
      }
}