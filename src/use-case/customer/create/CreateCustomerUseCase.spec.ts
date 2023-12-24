import CreateCustomerUseCase from "./CreateCustomerUseCase"




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
describe("Test the create use case customer ", ()=>{

    it("create customer data",async ()=>{
        const usecase=new CreateCustomerUseCase(mock());
        
        const input={
            name:"customer1",
            cpf:"640.819.000-60",
            email:"customer@hotmail.com",
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