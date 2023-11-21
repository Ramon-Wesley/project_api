import Entity from "../../../../@shared/entity/Entity";
import NotificationError from "../../../../@shared/notification/NotificationError";
import PurchaseOrderItemFactoryValidator from "../factory/PurchaseOrder-item.factory.validator";

export default class PurchaseOrderItem extends Entity{
    private purchaseOrder_id:string;
    private product_id:string;
    private quantity:number;
    private unitaryValue:number;
    private total:number=0;

    constructor(id:string,purchaseOrder_id:string,product_id:string,quantity:number,unitaryValue:number){
            super(id)
            this.purchaseOrder_id=purchaseOrder_id;
            this.product_id=product_id;
            this.quantity=quantity;
            this.unitaryValue=unitaryValue
            this.total=this.TotalValuePurchaseItem();
            this.validate()
            
         }

          TotalValuePurchaseItem():number{
            return this.quantity * this.unitaryValue;
         }

         changePurchaseOrder(purchaseOrder_id:string){
            this.purchaseOrder_id=purchaseOrder_id;
            this.validate()
         }
         changeProductId(product_id:string){
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
            PurchaseOrderItemFactoryValidator.create()
            .validate(this)
            if(this.notification.hasErrors()){
                throw new NotificationError(this.notification.getErrors())
            }
         }
         get PurchaseOrderId():string{
            return this.purchaseOrder_id
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