import CategoryFactory from "../../../../domain/checkout/products/category/factory/CategoryFactory"
import CategoryDeleteUseCase from "./CategoryDeleteUseCase"





const category=CategoryFactory.create("category1","category description")


const mock=()=>{
    return {
    findById:jest.fn().mockReturnValue(Promise.resolve(category)),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn(),
    findByEmail:jest.fn()
}
}

describe("Test the delete by id use case category ",()=>{
    it("delete category data by id",async ()=>{
        const categoryRepository=mock();
        const usecase=new CategoryDeleteUseCase(categoryRepository)
        
        const input ={
            id:"123"
        }
      
        const result=await usecase.execute(input)
        
        expect(result).toBeUndefined();

    })

    it("delete category not exists data by id",async ()=>{
    
        const categoryRepository=mock();
        categoryRepository.findById.mockImplementation(()=>{throw new Error("category not found!")})
        categoryRepository.deleteById.mockImplementation(()=>{throw new Error("category not found!")})
        const usecase=new CategoryDeleteUseCase(categoryRepository)
        
        const input ={
            id:"123"
        }
        expect(async()=>{return await usecase.execute(input)}).rejects.toThrow("category not found!")
    })
})