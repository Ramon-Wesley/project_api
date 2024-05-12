import CategoryFactory from "../../../../domain/checkout/products/category/factory/CategoryFactory";
import ProductCreateUseCase from "./ProductCreateUseCase";


const category=CategoryFactory.create("category1","category Description")

const mock=()=>{
    return {
    findById:jest.fn(),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
   
}
}

const mock2=()=>{
    return {
    findById:jest.fn().mockReturnValue(Promise.resolve(category)),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
    findByEmail:jest.fn()
}
}
describe("Test the create use case product ", ()=>{

    it("create product data",async ()=>{
        const usecase=new ProductCreateUseCase(mock(),mock2());
        
        const input={
            name:"product1",
            price:20,
            quantity:10,
            category_id:category.Id
        
}
    const result=await usecase.execute(input)
    expect(result).toBeUndefined()

})

})