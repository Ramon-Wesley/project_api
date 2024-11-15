import Entity from "../../../../@shared/entity/Entity";
import NotificationError from "../../../../@shared/notification/NotificationError";
import SalesOrderItemFactoryValidator from "../factory/SalesOrder-item.factory.validator";

export default class SalesOrderItem extends Entity{
    private product_id:string;
    private quantity:number;
    private unitaryValue:number;
    private total:number=0;

    constructor(id:string,product_id:string,quantity:number,unitaryValue:number){
            super(id)
            this.product_id=product_id;
            this.quantity=quantity;
            this.unitaryValue=unitaryValue
            this.total=this.TotalValueSalesItem();
            this.validate()
            
         }

          TotalValueSalesItem():number{
            return this.quantity * this.unitaryValue;
         }

         changeProduct(product_id:string,name:string){
            this.product_id=product_id;
            this.validate()
         }
         changeQuantity(quantity:number){
            this.quantity=quantity
            this.validate()
         }
         changeUnitaryValue(unitaryValue:number){
            this.unitaryValue=unitaryValue;
         }
         validate(){
            SalesOrderItemFactoryValidator.create()
            .validate(this)
            if(this.notification.hasErrors()){
                throw new NotificationError(this.notification.getErrors())
            }
         }
      
         get ProductId():string{
            return this.product_id;
         }
         get Quantity():number{
         return this.quantity;
         }
         get UnitaryValue():number{
            return this.unitaryValue
         }
         get Total(){
            return this.total
         }
         get Id(){
            return this.id;
         }
}