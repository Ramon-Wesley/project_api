import Address from "../../../domain/@shared/object-value/address/Address";
import CustomerFactory from "../../../domain/customer/factory/CustomerFactory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";
import FindCustomerUseCase from "./FindCustomerUseCase";


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
describe("Test the find use case customer ",()=>{
    it("find customer data by id",async ()=>{
        const customerRepository=mock();
        const usecase=new FindCustomerUseCase(customerRepository);
        const input ={
            id:customer.Id
        }
        const output={
            name:customer.Name,
            email:customer.Email,
            cpf:customer.Cpf,
            date_of_birth:customer.Date_of_birth,
            isActive:customer.IsActive,
            address:{
                city:customer.Address?.City,
                uf:customer.Address?.Uf,
                description:customer.Address?.Description,
                neighborhood:customer.Address?.Neighborhood,
                number:customer.Address?.Number,
                street:customer.Address?.Street,
                zipCode:customer.Address?.ZipCode
            }
        }
        
        const result=await usecase.execute(input)
        console.log(result);
        
       expect(result).toEqual(output)

    })

    it("find customer not exists data by id",async ()=>{
        
        const customerRepository=mock()
        customerRepository.findById.mockImplementation(()=>{throw new Error("customer not found!")})
        const usecase=new FindCustomerUseCase(customerRepository);
        
        const input ={
            id:customer.Id
        }
        expect(async()=>{return await usecase.execute(input)}).rejects.toThrow("customer not found!")
    })
})