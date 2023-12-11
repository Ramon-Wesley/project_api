import Entity from "../../../@shared/entity/Entity";
import NotificationError from "../../../@shared/notification/NotificationError";
import ProductFactoryValidator from "../factory/Product.factory.validator";

export default class Product extends Entity{
    private name:string;
    private price:number;
    
    constructor(id:string,name:string,price:number){
        super(id)
        this.name=name;
        this.price=price
        this.validate()
    }

    private validate(){
        ProductFactoryValidator.create().validate(this)
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }

    changeName(name:string){
        this.name=name;
        this.validate()
    }

    changePrice(price:number){
        this.price=price;
        this.validate()
    }
    
    get Id(){
        return this.id
    }
    get Name(){
        return this.name
    }
    get Price(){
        return this.price
    }
}