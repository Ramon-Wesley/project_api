import SalesOrderZodValidator from "../validator/SalesOrder.zod";

export default class SalesOrderFactoryValidator{

    public static create(){
        return new SalesOrderZodValidator()
    }
}