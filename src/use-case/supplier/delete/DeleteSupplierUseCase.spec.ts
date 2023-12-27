import Address from "../../../domain/@shared/object-value/address/Address";
import EmployeeFactory from "../../../domain/employee/factory/EmployeeFactory";
import DeleteEmployeeUseCase from "./DeleteSupplierUseCase";





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

describe("Test the delete by id use case employee ",()=>{
    it("delete employee data by id",async ()=>{
        const employeeRepository=mock();
        const usecase=new DeleteEmployeeUseCase(employeeRepository)
        
        const input ={
            id:"123"
        }
      
        const result=await usecase.execute(input)
        
        expect(result).toBeUndefined();

    })

    it("delete employee not exists data by id",async ()=>{
    
        const employeeRepository=mock();
        employeeRepository.findById.mockImplementation(()=>{throw new Error("employee not found!")})
        employeeRepository.deleteById.mockImplementation(()=>{throw new Error("employee not found!")})
        const usecase=new DeleteEmployeeUseCase(employeeRepository)
        
        const input ={
            id:"123"
        }
        expect(async()=>{return await usecase.execute(input)}).rejects.toThrow("employee not found!")
    })
})