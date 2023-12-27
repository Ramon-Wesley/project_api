import UpdateSupplierUseCase from "./UpdateSupplierUseCase";

const mock=()=>{
    return {
    findById:jest.fn(),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
    findByEmail:jest.fn()
}
}
describe("Test the update by id use case supplier ", ()=>{

    it("update supplier data",async ()=>{
        const usecase=new UpdateSupplierUseCase(mock());
        
        const input={
            id:"123",
            name:"supplier1",
            cnpj:"66.670.330/0001-00",
            email:"supplier@hotmail.com",
        date_of_birth:new Date(),
        address:{
            uf:"mg",
            city:"belo oriente",
            neighborhood:"floresta",
            zipCode:"35170-301",
            street:"magalhaes pinto",
            number:"123",
            description:""
        },
        isActive:true
}
    const result=await usecase.execute(input)
    expect(result).toBeUndefined()

})

it("update supplier not found data",async ()=>{
    const supplierRepository=mock();
    supplierRepository.updateById.mockImplementation(()=>{throw new Error("supplier not found!")});
    const usecase=new UpdateSupplierUseCase(supplierRepository);
    
    const input={
        id:"1232323",
        name:"supplier1",
        cnpj:"66.670.330/0001-00",
        email:"supplier@hotmail.com",
    date_of_birth:new Date(),
    address:{
        uf:"mg",
        city:"belo oriente",
        neighborhood:"floresta",
        zipCode:"35170-301",
        street:"magalhaes pinto",
        number:"123",
        description:""
    },
    isActive:true
}
expect(async()=>await usecase.execute(input)).rejects.toThrow("supplier not found!")

})

})