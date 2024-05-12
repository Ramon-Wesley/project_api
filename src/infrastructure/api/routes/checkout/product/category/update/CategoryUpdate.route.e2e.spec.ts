import request from "supertest";
import ExpressConfig from "../../../../../express/express";
import {StatusCodes} from "http-status-codes";
import CategoryFindAllOutDto from '../../../../../../../use-case/checkout/category/findAll/CategoryFindAllOutDto';

describe("E2E test for category update",()=>{
 

     it("update a category",async()=>{
     const app=await ExpressConfig.execute()
     await request(app).post("/category")
        .send({
            name:"category123",
            description:""
})
const findResponse=await request(app).get("/category?name=category123")
const entity=findResponse.body as CategoryFindAllOutDto
const category=entity.entity[0];
category.name="nameCategory2"

const response= await request(app).put(`/category/${category.id}`).send(category)

const findUpdateResponse= await request(app).get(`/category/${category.id}`)

expect(StatusCodes.OK).toBe(response.statusCode)
expect(findUpdateResponse.body.name).toBe(category.name)

     
     })

     it("update a category with id not exists",async()=>{
          const app=await ExpressConfig.execute()
          const response=await request(app).put("/category/123")
             .send({
                 name:"category123",
                 description:""
     })
          expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
     
          })
  
})