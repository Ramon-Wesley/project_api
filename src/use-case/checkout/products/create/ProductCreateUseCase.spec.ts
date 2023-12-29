import ProductCreateUseCase from "./ProductCreateUseCase";


const mock=()=>{
    return {
    findById:jest.fn(),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
   
}
}
describe("Test the create use case product ", ()=>{

    it("create product data",async ()=>{
        const usecase=new ProductCreateUseCase(mock());
        
        const input={
            name:"product1",
            price:20,
            quantity:10,
            category_id:"123"
        
}
    const result=await usecase.execute(input)
    expect(result).toBeUndefined()

})

})