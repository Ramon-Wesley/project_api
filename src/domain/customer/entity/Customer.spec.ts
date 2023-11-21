import Notification from "../../@shared/notification/Notification";
import Address from "../object-value/Address";
import Customer from "./Customer";

describe("test the customer entity",()=>{

    it("correctly enter customer data",()=>{
    
        const customer={
            id:"1234",
            name:"customer1",
            cpf:"11829876643",
            email:"customer@hotmail.com",
            date_of_birth:new Date("2000-01-01"),    
        }

        const result=new Customer(customer.id,customer.name,customer.cpf,customer.email,customer.date_of_birth);
        expect(result.Id).toBe(customer.id)
        expect(result.Cpf).toBe(customer.cpf)
        expect(result.Email).toBe(customer.email)
    })



    it("correctly enter customer data with address",()=>{
        const address={
                uf:"MG",
                zipCode:"35170-300",
                city:"Cel Fabriciano",
                street:"Magalhães pinto",
                neighborhood:"centro",
                number:"111",
                description:""
        }

        const customer={
            id:"1234",
            name:"customer1",
            cpf:"11829876643",
            email:"customer@hotmail.com",
            date_of_birth:new Date("2000-01-01"),    
        }

        const result=new Customer(customer.id,customer.name,customer.cpf,customer.email,customer.date_of_birth);
        result.changeAddress(new Address(address.uf,address.city,address.neighborhood,address.zipCode,address.street,address.number,address.description))
        expect(result.Id).toBe(customer.id)
        expect(result.Cpf).toBe(customer.cpf)
        expect(result.Email).toBe(customer.email)
        expect(result.Address?.ZipCode).toBe(address.zipCode)
    })

    it("invalid CPF and Email enter customer data",()=>{
        const customer={
            id:"1234",
            name:"customer",
            cpf:"111111111",
            email:"customer",
            date_of_birth:new Date("2000-01-01"),    
        }
        expect(() => {
            const result = new Customer(
              customer.id,
              customer.name,
              customer.cpf,
              customer.email,
              customer.date_of_birth
            );
          }).toThrow("customer: Invalid CPF!,customer: Invalid Email!");
        
        
    })

    it("invalid ZipCode enter customer.Address data",()=>{
        const customer={
            id:"1234",
            name:"customer",
            cpf:"11829876643",
            email:"customer@hotmail.com",
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

    const result = new Customer(
      customer.id,
      customer.name,
      customer.cpf,
      customer.email,
      customer.date_of_birth
    );
        expect(() => {
            result.changeAddress(new Address(address.uf,address.city,address.neighborhood,address.zipCode,address.street,address.number,address.description))
          }).toThrow("address: invalid ZipCode!");
        
        
    })

})