import Entity from "../../../../@shared/entity/Entity";
import NotificationError from "../../../../@shared/notification/NotificationError";
import ObjectValue from "../../../../@shared/object-value/ObjectValue";
import CategoryFactoryValidator from "../factory/CategoryFactoryValidator";


export default class Category extends Entity{
    private name:string;
    private description:string;
    private isActive:boolean=true;
    
    constructor(id:string,name:string,description:string){
        super(id)
        this.name=name;
        this.description=description
        this.validate()
    }

    private validate(){
        CategoryFactoryValidator.create().validate(this)
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }

   
    activate(){
        this.isActive=true;
    }

    disable(){
        this.isActive=false;
    }

    changeName(name:string){
        this.name=name;
        this.validate()
    }

    changeDescription(description:string){
        this.description=description;
        this.validate()
    }
    
   
    get Name(){
        return this.name
    }
    get Description(){
        return this.description
    }
    get Id(){
        return this.id;
    }

    get IsActive(){
        return this.isActive
    }
}