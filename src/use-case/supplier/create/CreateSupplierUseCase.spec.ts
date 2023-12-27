import CreateSupplierUseCase from "./CreateSupplierUseCase"




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
describe("Test the create use case supplier ", ()=>{

    it("create supplier data",async ()=>{
        const usecase=new CreateSupplierUseCase(mock());
        
        const input={
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

})