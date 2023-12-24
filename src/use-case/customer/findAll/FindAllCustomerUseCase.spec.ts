import Address from "../../../domain/@shared/object-value/address/Address";
import CustomerFactory from "../../../domain/customer/factory/CustomerFactory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/CustomerRepositoryInterface";
import FindAllCustomerUseCase from "./FindAllCustomerUseCase";



const address=new Address("MG","city1","bairro","35170-300","ruab","123")
const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
"customer@hotmail.com",new Date("2000-01-01"),address)

const resultEntity=[{
    id: customer.Id,
    name: customer.Name,
    cpf: customer.Cpf,
    email: customer.Email,
    date_of_birth: customer.Date_of_birth,
    address: {
        uf: customer.Address?.Uf,
        city: customer.Address?.City,
        neighborhood: customer.Address?.Neighborhood,
        zipCode: customer.Address?.ZipCode,
        street: customer.Address?.Street,
        number: customer.Address?.Number,
        description: customer.Address?.Description,
    },
    isActive:customer.IsActive
}];


const findResult={
entity:[customer],
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
describe("Test the find all use case customer ",()=>{
    it("find customer data by id",async ()=>{

        const customerRepository=mock();
        const usecase=new FindAllCustomerUseCase(customerRepository);
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