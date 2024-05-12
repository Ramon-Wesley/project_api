import CategoryFactory from "../../../../domain/checkout/products/category/factory/CategoryFactory"
import CategoryFindUseCase from "./CategoryFindUseCase"




const category=CategoryFactory.create("category1","category Description")


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
describe("Test the find use case category ",()=>{
    it("find category data by id",async ()=>{
        const categoryRepository=mock();
        const usecase=new CategoryFindUseCase(categoryRepository);
        const input ={
            id:category.Id
        }
        const output={
            name:category.Name,           
            description:category.Description,
            isActive:category.IsActive
        }
        
        const result=await usecase.execute(input)
        console.log(result);
        
       expect(result).toEqual(output)

    })

    it("find category not exists data by id",async ()=>{
        
        const categoryRepository=mock()
        categoryRepository.findById.mockImplementation(()=>{throw new Error("category not found!")})
        const usecase=new CategoryFindUseCase(categoryRepository);
        
        const input ={
            id:category.Id
        }
        expect(async()=>{return await usecase.execute(input)}).rejects.toThrow("category not found!")
    })
})