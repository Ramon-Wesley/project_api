import uuid from "uuid"
import PurchaseOrderItem from "../entity/PurchaseOrder-item";
export default class PurchaseOrderItemFactory{

    public static create(purchaseOrder_id:string,product_id:string,quantity:number,unitaryValue:number){
        return new PurchaseOrderItem(uuid.v4(),purchaseOrder_id,product_id,quantity,unitaryValue);
    }
}