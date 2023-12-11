import {v4 as uuid} from "uuid"
import PurchaseOrderItem from "../entity/PurchaseOrder-item";
export default class PurchaseOrderItemFactory{

    public static create(product_id:string,quantity:number,unitaryValue:number){
        return new PurchaseOrderItem(uuid(),product_id,quantity,unitaryValue);
    }
}