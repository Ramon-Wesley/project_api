import request from "supertest";
import {StatusCodes} from "http-status-codes";
import ExpressConfig from "../../../../../express/express";
import CategoryFindAllOutDto from "../../../../../../../use-case/checkout/category/findAll/CategoryFindAllOutDto";

describe("E2E test for delete category",()=>{
 

     it("delete a category",async()=>{
     const app=await ExpressConfig.execute()
     await request(app).post("/category")
     .send({
          name:"category123",
          description:"category description",
          isActive:true
})

const findResponse=await request(app).get("/category?name=category123")
console.log("TESTE...")
console.log(findResponse.body.entity[0].id)
const response=await request(app).delete(`/category/${findResponse.body.entity[0].id}`)

expect(response.status).toBe(StatusCodes.OK)
     })

     it("delete a category not exists",async()=>{
          const app=await ExpressConfig.execute()
          const response=await request(app).delete(`/category/1`)

          expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
     
          })

})