import Customer from "../entity/Customer";
import { v4 as uuidv4 } from 'uuid';
import Address from "../../@shared/object-value/address/Address";
interface customerCreate{
    name:string;
    email:string;
    cpf:string;
    date_of_birth:Date;
}
export default class CustomerFactory{

    static create( name:string,cpf:string,email:string,date_of_birth:Date):Customer
        {
            const id=uuidv4()
            return new Customer(id,name,cpf,email,date_of_birth)
        }

      static createWithAddress( 
            name:string,
            cpf:string,
            email:string,
            date_of_birth:Date,
            address:Address
            ):Customer
            {
                const id=uuidv4()
                const customer=new Customer(id,name,cpf,email,date_of_birth);
                customer.changeAddress(address)
                return customer
            }
    
            static createWithId( id:string,name:string,cpf:string,email:string,date_of_birth:Date):Customer
            {
                const customer=new Customer(id,name,cpf,email,date_of_birth);
                return customer
            }
             
}