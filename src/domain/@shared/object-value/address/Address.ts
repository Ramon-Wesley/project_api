import NotificationError from "../../notification/NotificationError";
import ObjectValue from "../ObjectValue";
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
        if(this.getNotification().hasErrors()){
            throw new NotificationError(this.getNotification().getErrors())
        }
    }

    validate(){
        AddressFactoryValidator.create().validate(this)
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