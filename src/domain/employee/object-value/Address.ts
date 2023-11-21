import NotificationError from "../../@shared/notification/NotificationError";
import ObjectValue from "../../@shared/object-value/ObjectValue";
import AddressFactoryValidator from "./factory/Address.factory.validator";

export default class Address extends ObjectValue{
    private uf:string;
    private city:string;
    private neighborhood:string;
    private zipCode:string;
    private street:string;
    private number:string;
    private description:string;

    constructor(uf:string,city:string,neighborhood:string,zipCode:string,street:string,number:string,description=""){
        super()
        this.uf=uf;
        this.city=city;
        this.neighborhood=neighborhood;
        this.zipCode=zipCode,
        this.street=street,
        this.number=number;
        this.description=description;
        this.validate()
        
    }

    validate(){
        AddressFactoryValidator.create().validate(this)
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }
    get Uf(){
    return this.uf
     }
     get City(){
        return this.city
     }
     get Neighborhood(){
        return this.neighborhood
     }
    get ZipCode(){
        return this.zipCode;
    }
    get Street(){
        return this.street
    }   
    get Number(){
        return this.number;
    }
    get Description(){
        return this.description;
    }
}