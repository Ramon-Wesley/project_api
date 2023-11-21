import uuid from "uuid"
import SaleOrderItem from "../entity/SaleOrder-item";
export default class SaleOrderItemFactory{

    public static create(saleOrder_id:string,product_id:string,quantity:number,unitaryValue:number){
        return new SaleOrderItem(uuid.v4(),saleOrder_id,product_id,quantity,unitaryValue);
    }
}