import Address from "../../@shared/object-value/address/Address";
import Supplier from "../entity/Supplier";
import {v4 as uuidv4} from "uuid";
export default class SupplierFactory{

     static create( name:string,
        cnpj:string,
        email:string,
        date_of_birth:Date):Supplier
        {
            const uuid=uuidv4()
            return new Supplier(uuid,name,cnpj,email,date_of_birth)
        }

        static createWithAddress( 
            name:string,
            cnpj:string,
            email:string,
            date_of_birth:Date,
            address:Address
            ):Supplier
            {
                const uuid=uuidv4()
                const supplier=new Supplier(uuid,name,cnpj,email,date_of_birth);
                supplier.changeAddress(address)
                return supplier
            }
}