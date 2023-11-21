import Supplier from "../entity/Supplier";
import uuid from "uuid";
import Address from "../object-value/Address";
export default class SupplierFactory{

    private static create( name:string,
        cnpj:string,
        email:string,
        date_of_birth:Date):Supplier
        {
            return new Supplier(uuid.v4(),name,cnpj,email,date_of_birth)
        }

        private static createWithAddress( 
            name:string,
            cnpj:string,
            email:string,
            date_of_birth:Date,
            address:Address
            ):Supplier
            {
                const supplier=new Supplier(uuid.v4(),name,cnpj,email,date_of_birth);
                supplier.changeAddress(address)
                return supplier
            }
}