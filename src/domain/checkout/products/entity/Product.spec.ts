import Product from "./Product";

describe("test the product entity",()=>{

    it("correctly enter product data",()=>{
        const product={
            id:"123",
            name:"product1",
            quantity:3,
            price:100,
            category_id:"123"
        }
       
        const result=new Product(product.id,product.name,product.price,product.quantity,product.category_id);

        expect(result.Id).toBe(product.id)
        expect(result.Name).toBe(product.name)
        expect(result.Price).toBe(product.price)
        expect(result.Quantity).toBe(product.quantity)
        expect(result.Category_id).toEqual(product.category_id)
    
    })
    it("incorrectly enter product data",()=>{
        const product={
            id:" ",
            name:" ",
            price:-100,
            quantity:-100,
            category_id:" "
        }
    
        expect(()=>new Product(product.id,product.name,product.price,product.quantity,product.category_id))
        .toThrow("product: The product name must be at least 2 characters long!,product: The product price must not be less than zero!,product: The product quantity must not be less than zero!,product: Invalid category Id!")

    
    })
})