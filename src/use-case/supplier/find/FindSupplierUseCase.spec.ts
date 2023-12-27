import Address from "../../../domain/@shared/object-value/address/Address";
import SupplierFactory from "../../../domain/supplier/factory/SupplierFactory";
import FindSupplierUseCase from "./FindSupplierUseCase";


const address=new Address("MG","city1","bairro","35170-300","ruab","123")
const supplier=SupplierFactory.createWithAddress("supplier1","66.670.330/0001-00",
"supplier@hotmail.com",new Date("2000-01-01"),address)


const mock=()=>{
    return {
    findById:jest.fn().mockReturnValue(Promise.resolve(supplier)),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
    findByEmail:jest.fn()
}
}
describe("Test the find use case supplier ",()=>{
    it("find supplier data by id",async ()=>{
        const supplierRepository=mock();
        const usecase=new FindSupplierUseCase(supplierRepository);
        const input ={
            id:supplier.Id
        }
        const output={
            name:supplier.Name,
            email:supplier.Email,
            cnpj:supplier.Cnpj,
            date_of_birth:supplier.Date_of_birth,
            isActive:supplier.IsActive,
            address:{
                city:supplier.Address?.City,
                uf:supplier.Address?.Uf,
                description:supplier.Address?.Description,
                neighborhood:supplier.Address?.Neighborhood,
                number:supplier.Address?.Number,
                street:supplier.Address?.Street,
                zipCode:supplier.Address?.ZipCode
            }
        }
        
        const result=await usecase.execute(input)
   
        
       expect(result).toEqual(output)

    })

    it("find supplier not exists data by id",async ()=>{
        
        const supplierRepository=mock()
        supplierRepository.findById.mockImplementation(()=>{throw new Error("supplier not found!")})
        const usecase=new FindSupplierUseCase(supplierRepository);
        
        const input ={
            id:supplier.Id
        }
        expect(async()=>{return await usecase.execute(input)}).rejects.toThrow("supplier not found!")
    })
})