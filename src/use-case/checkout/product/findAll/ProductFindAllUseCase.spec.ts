

import CategoryFactory from "../../../../domain/checkout/products/category/factory/CategoryFactory";
import ProductFactory from "../../../../domain/checkout/products/factory/Product.factory";
import FindAllProductUseCase from "./ProductFindAllUseCase";




const category=CategoryFactory.create("category","categoryDescription")
const product=ProductFactory.create("product1",200,10,category.Id)

const resultEntity=[{
    id: product.Id,
    name: product.Name,
    price: product.Price,
    category_id:product.Category_id,
    quantity:product.Quantity,
    isActive:product.IsActive
}];


const findResult={
entity:[product],
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
describe("Test the find all use case product ",()=>{
    it("find product data by id",async ()=>{

        const productRepository=mock();
        const usecase=new FindAllProductUseCase(productRepository);
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