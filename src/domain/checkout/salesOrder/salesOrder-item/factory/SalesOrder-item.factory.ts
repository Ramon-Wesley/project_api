import {v4 as uuid} from "uuid"
import SalesOrderItem from "../entity/SalesOrder-item";
export default class SalesOrderItemFactory{

    public static create(product_id:string,quantity:number,unitaryValue:number){
        return new SalesOrderItem(uuid(),product_id,quantity,unitaryValue);
    }
}