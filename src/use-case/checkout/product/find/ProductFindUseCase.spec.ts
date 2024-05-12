
import ProductFactory from "../../../../domain/checkout/products/factory/Product.factory"
import ProductFindUseCase from "./ProductFindUseCase"




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
describe("Test the find use case product ",()=>{
    it("find product data by id",async ()=>{
        const productRepository=mock();
        const usecase=new ProductFindUseCase(productRepository);
        const input ={
            id:product.Id
        }
        const output={
            name:product.Name,           
            price:product.Price,
            quantity:product.Quantity,
            category_id:product.Category_id,
            isActive:product.IsActive
        }
        
        const result=await usecase.execute(input)
        
       expect(result).toEqual(output)

    })

    it("find product not exists data by id",async ()=>{
        
        const productRepository=mock()
        productRepository.findById.mockImplementation(()=>{throw new Error("product not found!")})
        const usecase=new ProductFindUseCase(productRepository);
        
        const input ={
            id:product.Id
        }
        expect(async()=>{return await usecase.execute(input)}).rejects.toThrow("product not found!")
    })
})