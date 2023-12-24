import CreateEmployeeUseCase from "./CreateEmployeeUseCase"




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
describe("Test the create use case employee ", ()=>{

    it("create employee data",async ()=>{
        const usecase=new CreateEmployeeUseCase(mock());
        
        const input={
            name:"employee1",
            ra:"64081910",
            email:"employee@hotmail.com",
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