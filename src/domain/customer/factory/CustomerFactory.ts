import Customer from "../entity/Customer";
import uuid from "uuid";
import Address from "../object-value/Address";
export default class CustomerFactory{

    private static create( name:string,
        cpf:string,
        email:string,
        date_of_birth:Date):Customer
        {
            return new Customer(uuid.v4(),name,cpf,email,date_of_birth)
        }

        private static createWithAddress( 
            name:string,
            cpf:string,
            email:string,
            date_of_birth:Date,
            address:Address
            ):Customer
            {
                const customer=new Customer(uuid.v4(),name,cpf,email,date_of_birth);
                customer.changeAddress(address)
                return customer
            }
}