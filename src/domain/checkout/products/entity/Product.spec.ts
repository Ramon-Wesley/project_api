import Product from "./Product";

describe("test the product entity",()=>{

    it("correctly enter product data",()=>{
        const product={
            id:"123",
            name:"product1",
            price:100,
            quantity:10,
            category_id:"123"
        }
        const result=new Product(product.id,product.name,product.price,product.quantity,product.category_id);

        expect(product.id).toBe(result.Id)
        expect(product.name).toBe(result.Name)
        expect(product.price).toBe(result.Price)
    
    })
    it("incorrectly enter product data",()=>{
        const product={
            id:" ",
            name:" ",
            price:-100,
            quantity:-10,
            category_id:" "

        }
        expect(()=>new Product(product.id,product.name,product.price,product.quantity,product.category_id))
        .toThrow("product: The product name must be at least 2 characters long!,product: The product price must not be less than zero!,product: The product quantity must not be less than zero!,product: Invalid category Id!")
    })
})