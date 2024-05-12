import ProductFactory from "../../../../domain/checkout/products/factory/Product.factory"
import ProductDeleteUseCase from "./ProductDeleteUseCase"





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

describe("Test the delete by id use case product ",()=>{
    it("delete product data by id",async ()=>{
        const productRepository=mock();
        const usecase=new ProductDeleteUseCase(productRepository)
        
        const input ={
            id:"123"
        }
      
        const result=await usecase.execute(input)
        
        expect(result).toBeUndefined();

    })

    it("delete product not exists data by id",async ()=>{
    
        const productRepository=mock();
        productRepository.findById.mockImplementation(()=>{throw new Error("product not found!")})
        productRepository.deleteById.mockImplementation(()=>{throw new Error("product not found!")})
        const usecase=new ProductDeleteUseCase(productRepository)
        
        const input ={
            id:"123"
        }
        expect(async()=>{return await usecase.execute(input)}).rejects.toThrow("product not found!")
    })
})