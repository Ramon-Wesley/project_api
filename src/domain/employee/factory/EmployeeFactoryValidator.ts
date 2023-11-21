import ValidatorInterface from "../../@shared/validator/Validator.interface";
import Employee from "../entity/Employee";
import EmployeeZodValidator from "../validator/Employee.zod";


export default class EmployeeFactoryValidator{

    public static create():ValidatorInterface<Employee>{
        return new EmployeeZodValidator();
    }
}