import Entity from "../../../@shared/entity/Entity";
import NotificationError from "../../../@shared/notification/NotificationError";
import Category from "../category/entity/Category";
import ProductFactoryValidator from "../factory/Product.factory.validator";

export default class Product extends Entity{
    private name:string;
    private price:number;
    private quantity:number;
    private isActive:boolean=true;
    private category_id:string;
    
    constructor(id:string,name:string,price:number,quantity:number,category_id:string){
        super(id)
        this.name=name;
        this.price=price
        this.quantity=quantity;
        this.category_id=category_id;
        this.validate()
    }

    private validate(){
        ProductFactoryValidator.create().validate(this)
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

    changeCategory(category_id:string)
    {
        this.category_id=category_id
        this.validate()
    }

    changeQuantity(quantity:number){
        this.quantity=quantity
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
    get Quantity(){
        return this.quantity
    }
    get Category_id(){
        return this.category_id;
    }
    
    get IsActive(){
        return this.isActive
    }
}