import ValidatorInterface from "../../@shared/validator/Validator.interface";
import Customer from "../entity/Customer";
import CustomerZodValidator from "../validator/Customer.zod";

export default class CustomerFactoryValidator{

    public static create():ValidatorInterface<Customer>{
        return new CustomerZodValidator();
    }
}