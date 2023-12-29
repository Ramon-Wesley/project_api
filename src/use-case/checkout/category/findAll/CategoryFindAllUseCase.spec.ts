
import CategoryFactory from "../../../../domain/checkout/products/category/factory/CategoryFactory";
import FindAllCategoryUseCase from "./CategoryFindAllUseCase";



const category=CategoryFactory.create("category1","category description")

const resultEntity=[{
    id: category.Id,
    name: category.Name,
    description: category.Description,
    isActive:category.IsActive
}];


const findResult={
entity:[category],
current_page:1,
number_of_elements:1,
total_page:1
}


const mock=()=>{
    return {
    findById:jest.fn(),
    create:jest.fn(),
    updateById:jest.fn(),
    deleteById:jest.fn(),
    findAll:jest.fn().mockReturnValue(Promise.resolve(findResult)),
    findByEmail:jest.fn()
}
}
describe("Test the find all use case category ",()=>{
    it("find category data by id",async ()=>{

        const categoryRepository=mock();
        const usecase=new FindAllCategoryUseCase(categoryRepository);
        const input ={
            sort:"desc" as "desc" | "asc",
            filter:"",
            limit:7,
            page:1
        }

 
       const output={
        entity:resultEntity,
        current_page:1,
        number_of_elements:1,
        total_page:1
       }
        
        const result=await usecase.execute(input)
       
        
       expect(result).toEqual(output)

    })

    
})