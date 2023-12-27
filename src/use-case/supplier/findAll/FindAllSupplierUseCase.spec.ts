import Address from "../../../domain/@shared/object-value/address/Address";
import SupplierFactory from "../../../domain/supplier/factory/SupplierFactory";
import FindAllSupplierUseCase from "./FindAllSupplierUseCase";



const address=new Address("MG","city1","bairro","35170-300","ruab","123")
const supplier=SupplierFactory.createWithAddress("supplier1","66.670.330/0001-00",
"supplier@hotmail.com",new Date("2000-01-01"),address)

const resultEntity=[{
    id: supplier.Id,
    name: supplier.Name,
    cnpj: supplier.Cnpj,
    email: supplier.Email,
    date_of_birth: supplier.Date_of_birth,
    address: {
        uf: supplier.Address?.Uf,
        city: supplier.Address?.City,
        neighborhood: supplier.Address?.Neighborhood,
        zipCode: supplier.Address?.ZipCode,
        street: supplier.Address?.Street,
        number: supplier.Address?.Number,
        description: supplier.Address?.Description,
    },
    isActive:supplier.IsActive
}];


const findResult={
entity:[supplier],
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
describe("Test the find all use case supplier ",()=>{
    it("find supplier data by id",async ()=>{

        const supplierRepository=mock();
        const usecase=new FindAllSupplierUseCase(supplierRepository);
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