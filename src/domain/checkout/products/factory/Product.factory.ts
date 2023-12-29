import { v4 as uuidv4 } from "uuid";
import Product from "../entity/Product";

export default class ProductFactory{

    static create(name:string,price:number,quantity:number,category_id:string){
        const uuid=uuidv4()
        return new Product(uuid,name,price,quantity,category_id)
    }
}