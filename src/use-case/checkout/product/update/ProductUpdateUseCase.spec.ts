import CategoryFactory from "../../../../domain/checkout/products/category/factory/CategoryFactory";
import ProductFactory from "../../../../domain/checkout/products/factory/Product.factory";
import ProductUpdateUseCase from "./ProductUpdateUseCase";


const category=CategoryFactory.create("category1","category Description")
const product=ProductFactory.create("product1",200,10,"123")

const mock=()=>{
    return {
    findById:jest.fn().mockReturnValue(Promise.resolve(product)),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
    findByEmail:jest.fn()
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

describe("Test the update use case product ", ()=>{

    it("update product data",async ()=>{
        const usecase=new ProductUpdateUseCase(mock(),mock2());
        
        const input={
            id:"123",
            name:"product1",
            price:20,
            quantity:10,
            category_id:"123"
        
}
    const result=await usecase.execute(input)
    expect(result).toBeUndefined()

})

})