import PurchaseOrderItemZodValidator from "../validator/PurchaseOrder-item.zod";

export default class PurchaseOrderItemFactoryValidator{

    public static create(){
       return new PurchaseOrderItemZodValidator();
    }
}