import Address from "../../../domain/@shared/object-value/address/Address";
import EmployeeFactory from "../../../domain/employee/factory/EmployeeFactory";
import FindAllEmployeeUseCase from "./FindAllEmployeeUseCase";



const address=new Address("MG","city1","bairro","35170-300","ruab","123")
const employee=EmployeeFactory.createWithAddress("employee1","53340801",
"employee@hotmail.com",new Date("2000-01-01"),address)

const resultEntity=[{
    id: employee.Id,
    name: employee.Name,
    ra: employee.Ra,
    email: employee.Email,
    date_of_birth: employee.Date_of_birth,
    address: {
        uf: employee.Address?.Uf,
        city: employee.Address?.City,
        neighborhood: employee.Address?.Neighborhood,
        zipCode: employee.Address?.ZipCode,
        street: employee.Address?.Street,
        number: employee.Address?.Number,
        description: employee.Address?.Description,
    },
    isActive:employee.IsActive
}];


const findResult={
entity:[employee],
current_page:1,
number_of_elements:1,
total_page:1
}


const mock=()=>{
    return {
    findById:jest.fn(),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn().mockReturnValue(Promise.resolve(findResult)),
    findByEmail:jest.fn()
}
}
describe("Test the find all use case employee ",()=>{
    it("find employee data by id",async ()=>{

        const employeeRepository=mock();
        const usecase=new FindAllEmployeeUseCase(employeeRepository);
        const input ={
            sort:"desc" as "desc" | "asc",
            filter:"",
            limit:7,
            page:1
        }

 
       const output={
        entity:resultEntity,
        current_page:1,
        number_of_elements:1,
        total_page:1
       }
        
        const result=await usecase.execute(input)
       
        
       expect(result).toEqual(output)

    })

    
})