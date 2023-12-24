import Address from "../../../domain/@shared/object-value/address/Address";
import EmployeeFactory from "../../../domain/employee/factory/EmployeeFactory";
import FindEmployeeUseCase from "./FindEmployeeUseCase";


const address=new Address("MG","city1","bairro","35170-300","ruab","123")
const employee=EmployeeFactory.createWithAddress("employee1","53340801",
"employee@hotmail.com",new Date("2000-01-01"),address)


const mock=()=>{
    return {
    findById:jest.fn().mockReturnValue(Promise.resolve(employee)),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
    findByEmail:jest.fn()
}
}
describe("Test the find use case employee ",()=>{
    it("find employee data by id",async ()=>{
        const employeeRepository=mock();
        const usecase=new FindEmployeeUseCase(employeeRepository);
        const input ={
            id:employee.Id
        }
        const output={
            name:employee.Name,
            email:employee.Email,
            ra:employee.Ra,
            date_of_birth:employee.Date_of_birth,
            isActive:employee.IsActive,
            address:{
                city:employee.Address?.City,
                uf:employee.Address?.Uf,
                description:employee.Address?.Description,
                neighborhood:employee.Address?.Neighborhood,
                number:employee.Address?.Number,
                street:employee.Address?.Street,
                zipCode:employee.Address?.ZipCode
            }
        }
        
        const result=await usecase.execute(input)
   
        
       expect(result).toEqual(output)

    })

    it("find employee not exists data by id",async ()=>{
        
        const employeeRepository=mock()
        employeeRepository.findById.mockImplementation(()=>{throw new Error("employee not found!")})
        const usecase=new FindEmployeeUseCase(employeeRepository);
        
        const input ={
            id:employee.Id
        }
        expect(async()=>{return await usecase.execute(input)}).rejects.toThrow("employee not found!")
    })
})