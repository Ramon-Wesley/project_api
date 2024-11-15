import SalesOrderItemZodValidator from "../validator/SalesOrder-item.zod";

export default class SalesOrderItemFactoryValidator{

    public static create(){
       return new SalesOrderItemZodValidator();
    }
}