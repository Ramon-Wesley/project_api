import request from "supertest";
import {StatusCodes} from "http-status-codes";
import ExpressConfig from "../../../../express/express";
import ProductFindAllOutDto from "../../../../../../use-case/checkout/product/findAll/ProductFindAllOutDto";


describe("E2E test find all category",()=>{
 

     it("find all product",async()=>{
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
   
   await request(app).post("/product")
   .send({
        name:"product1234",
        quantity:10,
        price:10,
        category_id:categoryId,
        isActive:true
   })
   const response=await request(app).get("/product")
   console.log(response)
   
     expect(response.status).toBe(StatusCodes.OK)
     expect(response.body).toBeDefined()
     expect(response.body.entity.length).toBe(2)
     expect(response.body.number_of_elements).toBe(2)

     })

     it("find all product not exists",async()=>{
        const app=await ExpressConfig.execute()

        const response=await request(app).get("/category")
        const entity=response.body as ProductFindAllOutDto
        expect(response.status).toBe(StatusCodes.OK)
        expect(response.body).toBeDefined()
        expect(entity.entity.length).toBe(0)
        expect(entity.number_of_elements).toBe(0)
   
        })

        })