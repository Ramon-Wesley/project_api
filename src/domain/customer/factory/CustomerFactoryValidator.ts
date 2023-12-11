import CustomerZodValidator from "../validator/Customer.zod";

export default class CustomerFactoryValidator{

    public static create(){
        return new CustomerZodValidator();
    }
}