import SaleOrderZodValidator from "../validator/SaleOrder.zod";

export default class SaleOrderFactoryValidator{

    public static create(){
        return new SaleOrderZodValidator()
    }
}