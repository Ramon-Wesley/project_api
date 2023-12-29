import CategoryCreateUseCase from "./CategoryCreateUseCase";


const mock=()=>{
    return {
    findById:jest.fn(),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
   
}
}
describe("Test the create use case customer ", ()=>{

    it("create customer data",async ()=>{
        const usecase=new CategoryCreateUseCase(mock());
        
        const input={
            name:"customer1",
            description:"description customer"
}
    const result=await usecase.execute(input)
    expect(result).toBeUndefined()

})

})