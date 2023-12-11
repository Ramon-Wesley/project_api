import Entity from "../../@shared/entity/Entity";
import NotificationError from "../../@shared/notification/NotificationError";
import SupplierFactoryValidator from "../factory/SupplierFactoryValidator";
import Address from "../../@shared/object-value/address/Address";

export default class Supplier extends Entity{

    private name:string;
    private cnpj:string;
    private email:string;
    private date_of_birth:Date;
    private address?:Address;
    private isActive:boolean=true;

    constructor( 
        id:string,
        name:string,
        cnpj:string,
        email:string,
        date_of_birth:Date){
        super(id)
        this.name=name;
        this.cnpj=cnpj;
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


        private validate(){
            SupplierFactoryValidator
            .create()
            .validate(this)    
            if(this.notification.hasErrors()){
              throw new NotificationError(this.notification.getErrors());
          }
        }

        changeAddress(address:Address){
        this.address=address;
        
        }
        
        changeName(name:string){
            this.name=name;
            this.validate();
        }
        changeCNPJ(cnpj:string){
            this.cnpj=cnpj;
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
      get Cnpj(){
        return this.cnpj
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