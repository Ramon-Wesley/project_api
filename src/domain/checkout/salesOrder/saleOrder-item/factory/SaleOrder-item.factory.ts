import {v4 as uuid} from "uuid"
import SaleOrderItem from "../entity/SaleOrder-item";
export default class SaleOrderItemFactory{

    public static create(product_id:string,quantity:number,unitaryValue:number){
        return new SaleOrderItem(uuid(),product_id,quantity,unitaryValue);
    }
}