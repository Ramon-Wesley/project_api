import ValidatorInterface from "../../@shared/validator/Validator.interface";
import Supplier from "../entity/Supplier";
import SupplierZodValidator from "../validator/Supplier.zod";


export default class SupplierFactoryValidator{

    public static create(){
        return new SupplierZodValidator();
    }
}