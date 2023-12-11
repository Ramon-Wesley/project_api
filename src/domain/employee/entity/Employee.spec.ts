import Notification from "../../@shared/notification/Notification";
import Address from "../../@shared/object-value/address/Address";
import Employee from "./Employee";


describe("test the employee entity",()=>{

    it("correctly enter employee data",()=>{
    
        const employee={
            id:"1234",
            name:"employee1",
            ra:"12345678",
            email:"employee@hotmail.com",
            date_of_birth:new Date("2000-01-01"),    
        }

        const result=new Employee(employee.id,employee.name,employee.ra,employee.email,employee.date_of_birth);
        expect(result.Id).toBe(employee.id)
        expect(result.Ra).toBe(employee.ra)
        expect(result.Email).toBe(employee.email)
    })



    it("correctly enter employee data with address",()=>{
        const address={
                uf:"MG",
                zipCode:"35170-300",
                city:"Cel Fabriciano",
                street:"Magalhães pinto",
                neighborhood:"centro",
                number:"111",
                description:""
        }

        const employee={
            id:"1234",
            name:"employee1",
            ra:"12345678",
            email:"employee@hotmail.com",
            date_of_birth:new Date("2000-01-01"),    
        }

        const result=new Employee(employee.id,employee.name,employee.ra,employee.email,employee.date_of_birth);
        result.changeAddress(new Address(address.uf,address.city,address.neighborhood,address.zipCode,address.street,address.number,address.description))
        expect(result.Id).toBe(employee.id)
        expect(result.Ra).toBe(employee.ra)
        expect(result.Email).toBe(employee.email)
        expect(result.Address?.ZipCode).toBe(address.zipCode)
    })

    it("invalid RA and Email enter employee data",()=>{
        const employee={
            id:"1234",
            name:"employee",
            ra:"111111111",
            email:"employee",
            date_of_birth:new Date("2000-01-01"),    
        }
        expect(() => {
            const result = new Employee(
              employee.id,
              employee.name,
              employee.ra,
              employee.email,
              employee.date_of_birth
            );
          }).toThrow("employee: Invalid RA!,employee: Invalid Email!");
        
        
    })

    it("invalid ZipCode enter employee.Address data",()=>{
        const employee={
            id:"1234",
            name:"employee",
            ra:"12345678",
            email:"employee@hotmail.com",
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

    const result = new Employee(
      employee.id,
      employee.name,
      employee.ra,
      employee.email,
      employee.date_of_birth
    );
        expect(() => {
            result.changeAddress(new Address(address.uf,address.city,address.neighborhood,address.zipCode,address.street,address.number,address.description))
          }).toThrow("address: invalid ZipCode!");
        
        
    })

})