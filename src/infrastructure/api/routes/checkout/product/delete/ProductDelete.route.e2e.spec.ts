import request from "supertest";
import {StatusCodes} from "http-status-codes";
import ExpressConfig from "../../../../express/express";


describe("E2E test for delete product",()=>{
 

     it("delete a product",async()=>{
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

const productId=findProduct.body.entity[0].id

const response=await request(app).delete(`/product/${productId}`)
const findResponse=await request(app).get(`/product/${productId}`)

expect(response.status).toBe(StatusCodes.OK)
expect(findResponse.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
     })

     it("delete a product not exists",async()=>{
          const app=await ExpressConfig.execute()
          const response=await request(app).delete(`/product/1`)

          expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
     
          })

})