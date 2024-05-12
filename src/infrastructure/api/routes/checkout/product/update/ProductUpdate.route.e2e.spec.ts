import request from "supertest";

import {StatusCodes} from "http-status-codes";
import ProductFindOutDto from "../../../../../../use-case/checkout/product/find/ProductFindOutDto";
import ProductFindAllOutDto from "../../../../../../use-case/checkout/product/findAll/ProductFindAllOutDto";
import ExpressConfig from "../../../../express/express";

describe("E2E test for category update",()=>{
 
     it("update a product",async()=>{
          const app=await ExpressConfig.execute()
          await request(app).post("/category")
          .send({
               name:"category123",
               description:"category description",
               isActive:true
     })
     
     const findCategoryResponse=await request(app).get("/category?name=category123")
     const categoryId=findCategoryResponse.body.entity[0].id
     
     await request(app).post("/product")
     .send({
          name:"product123",
          quantity:10,
          price:10,
          category_id:categoryId,
          isActive:true
     })
     
     const findProduct=await request(app).get("/product?name=product123")
     
     const productFindAll=findProduct.body as ProductFindAllOutDto

    
     const product=productFindAll.entity[0]
     product.name="productUpdated"
     console.log(product)
     
     await request(app).put(`/product/${product.id}`)
     .send(product)
  
     const findUpdateResponse=await request(app).get(`/product/${product.id}`)

     expect(StatusCodes.OK).toBe(findUpdateResponse.statusCode)
     
     expect(findUpdateResponse.body.name).toBe(product.name)
     })

     it("update a product with id not exists",async()=>{
          const app=await ExpressConfig.execute()
          await request(app).post("/category")
          .send({
               name:"category123",
               description:"category description",
               isActive:true
     })
     
     const findCategoryResponse=await request(app).get("/category?name=category123")
     const categoryId=findCategoryResponse.body.entity[0].id
          const response=await request(app).put("/product/123")
             .send({
               name:"product123",
               quantity:10,
               price:10,
               category_id:categoryId,
               isActive:true
     })
          expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
     
          })
  
})