import PurchaseOrderZodValidator from "../validator/PurchaseOrder.zod";

export default class PurchaseOrderFactoryValidator{

    public static create(){
        return new PurchaseOrderZodValidator()
    }
}