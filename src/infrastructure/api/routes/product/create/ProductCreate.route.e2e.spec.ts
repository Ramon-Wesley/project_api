import request from "supertest";
import ExpressConfig from "../../../express/express";
import {StatusCodes} from "http-status-codes";
import CategoryFindAllOutDto from "../../../../../use-case/checkout/category/findAll/CategoryFindAllOutDto";

describe("E2E test for product create",()=>{
 

     it("create a product",async()=>{
     const app=await ExpressConfig.execute()
     await request(app).post("/category")
        .send({
            name:"category123",
            description:"category description"
})
     const responseCategory=await request(app).get("/category")
     const entity=responseCategory.body as CategoryFindAllOutDto
     
     const response=await request(app).post("/product")
        .send({
            name:"product123",
            price:200,
            quantity:10,
            category_id:entity.entity[0].id

})

     expect(response.status).toBe(StatusCodes.CREATED)

     })

     it("create a product with insufficient dates",async()=>{
          const app=await ExpressConfig.execute()
          const response=await request(app).post("/product")
             .send({
                 name:"product123"
     })
          expect(response.status).toBe(StatusCodes.BAD_REQUEST)
     
          })

         
})