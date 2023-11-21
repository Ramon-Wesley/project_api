import uuid from "uuid";
import Address from "../object-value/Address";
import Employee from "../entity/Employee";
export default class EmployeeFactory{

    private static create( name:string,
        ra:string,
        email:string,
        date_of_birth:Date):Employee
        {
            return new Employee(uuid.v4(),name,ra,email,date_of_birth)
        }

        private static createWithAddress( 
            name:string,
            ra:string,
            email:string,
            date_of_birth:Date,
            address:Address
            ):Employee
            {
                const employee=new Employee(uuid.v4(),name,ra,email,date_of_birth);
                employee.changeAddress(address)
                return employee
            }
}