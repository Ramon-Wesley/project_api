import Notification from "../../@shared/notification/Notification";
import Address from "../object-value/Address";
import Supplier from "./Supplier";

describe("test the supplier entity",()=>{

    it("correctly enter supplier data",()=>{
    
        const supplier={
            id:"1234",
            name:"supplier1",
            cnpj:"51.866.226/0001-00",
            email:"supplier@hotmail.com",
            date_of_birth:new Date("2000-01-01"),    
        }

        const result=new Supplier(supplier.id,supplier.name,supplier.cnpj,supplier.email,supplier.date_of_birth);
        expect(result.Id).toBe(supplier.id)
        expect(result.Cnpj).toBe(supplier.cnpj)
        expect(result.Email).toBe(supplier.email)
    })



    it("correctly enter supplier data with address",()=>{
        const address={
                uf:"MG",
                zipCode:"35170-300",
                city:"Cel Fabriciano",
                street:"Magalhães pinto",
                neighborhood:"centro",
                number:"111",
                description:""
        }

        const supplier={
            id:"1234",
            name:"supplier1",
            cnpj:"51.866.226/0001-00",
            email:"supplier@hotmail.com",
            date_of_birth:new Date("2000-01-01"),    
        }

        const result=new Supplier(supplier.id,supplier.name,supplier.cnpj,supplier.email,supplier.date_of_birth);
        result.changeAddress(new Address(address.uf,address.city,address.neighborhood,address.zipCode,address.street,address.number,address.description))
        expect(result.Id).toBe(supplier.id)
        expect(result.Cnpj).toBe(supplier.cnpj)
        expect(result.Email).toBe(supplier.email)
        expect(result.Address?.ZipCode).toBe(address.zipCode)
    })

    it("invalid CNPJ and Email enter supplier data",()=>{
        const supplier={
            id:"1234",
            name:"supplier",
            cnpj:"111111111",
            email:"supplier",
            date_of_birth:new Date("2000-01-01"),    
        }
        expect(() => {
            const result = new Supplier(
              supplier.id,
              supplier.name,
              supplier.cnpj,
              supplier.email,
              supplier.date_of_birth
            );
          }).toThrow("supplier: Invalid CNPJ!,supplier: Invalid Email!");
        
        
    })

    it("invalid ZipCode enter supplier.Address data",()=>{
        const supplier={
            id:"1234",
            name:"supplier",
            cnpj:"51.866.226/0001-00",
            email:"supplier@hotmail.com",
            date_of_birth:new Date("2000-01-01"),    
        }
        const address={
            uf: "MG",
            zipCode: "11111111",
            city: "Cel Fabriciano",
            street: "Magalhães pinto",
            neighborhood: "centro",
            number: "111",
            description: "",
        }

    const result = new Supplier(
      supplier.id,
      supplier.name,
      supplier.cnpj,
      supplier.email,
      supplier.date_of_birth
    );
        expect(() => {
            result.changeAddress(new Address(address.uf,address.city,address.neighborhood,address.zipCode,address.street,address.number,address.description))
          }).toThrow("address: invalid ZipCode!");
        
        
    })

})