import Address from "../../../domain/@shared/object-value/address/Address";
import CustomerFactory from "../../../domain/customer/factory/CustomerFactory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";
import DeleteCustomerUseCase from "./DeleteCustomerUseCase";




const address=new Address("MG","city1","bairro","35170-300","ruab","123")
const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
"customer@hotmail.com",new Date("2000-01-01"),address)


const mock=()=>{
    return {
    findById:jest.fn().mockReturnValue(Promise.resolve(customer)),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
    findByEmail:jest.fn()
}
}

describe("Test the delete by id use case customer ",()=>{
    it("delete customer data by id",async ()=>{
        const customerRepository=mock();
        const usecase=new DeleteCustomerUseCase(customerRepository)
        
        const input ={
            id:"123"
        }
      
        const result=await usecase.execute(input)
        
        expect(result).toBeUndefined();

    })

    it("delete customer not exists data by id",async ()=>{
    
        const customerRepository=mock();
        customerRepository.findById.mockImplementation(()=>{throw new Error("customer not found!")})
        customerRepository.deleteById.mockImplementation(()=>{throw new Error("customer not found!")})
        const usecase=new DeleteCustomerUseCase(customerRepository)
        
        const input ={
            id:"123"
        }
        expect(async()=>{return await usecase.execute(input)}).rejects.toThrow("customer not found!")
    })
})