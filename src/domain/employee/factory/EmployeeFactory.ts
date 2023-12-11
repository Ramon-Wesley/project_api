import {v4 as uuidv4} from "uuid";

import Employee from "../entity/Employee";
import Address from "../../@shared/object-value/address/Address";
export default class EmployeeFactory{

     static create( name:string,
        ra:string,
        email:string,
        date_of_birth:Date):Employee
        {
            const uuid=uuidv4()
            return new Employee(uuid,name,ra,email,date_of_birth)
        }

         static createWithAddress( 
            name:string,
            ra:string,
            email:string,
            date_of_birth:Date,
            address:Address
            ):Employee
            {
                const uuid=uuidv4()
                const employee=new Employee(uuid,name,ra,email,date_of_birth);
                employee.changeAddress(address)
                return employee
            }
}