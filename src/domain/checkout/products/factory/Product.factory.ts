import { v4 as uuidv4 } from "uuid";
import Product from "../entity/Product";

export default class ProductFactory{

    static create(name:string,price:number){
        const uuid=uuidv4()
        return new Product(uuid,name,price)
    }
}