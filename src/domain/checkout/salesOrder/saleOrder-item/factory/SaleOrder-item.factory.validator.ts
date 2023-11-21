import SaleOrderItemZodValidator from "../validator/SaleOrder-item.zod";

export default class SaleOrderItemFactoryValidator{

    public static create(){
       return new SaleOrderItemZodValidator();
    }
}