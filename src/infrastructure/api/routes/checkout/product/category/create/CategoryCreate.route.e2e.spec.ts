import request from "supertest";
import ExpressConfig from "../../../../../express/express";
import {StatusCodes} from "http-status-codes";

describe("E2E test for category create",()=>{
 

     it("create a category",async()=>{
     const app=await ExpressConfig.execute()
     const response=await request(app).post("/category")
        .send({
            name:"category123",
            description:""
})
     expect(response.status).toBe(StatusCodes.CREATED)

     })

     it("create a category with insufficient dates",async()=>{
          const app=await ExpressConfig.execute()
          const response=await request(app).post("/category")
             .send({
                 name:"category123"
     })
          expect(response.status).toBe(StatusCodes.BAD_REQUEST)
     
          })

          it("create a category with duplicated name",async()=>{
               const app=await ExpressConfig.execute()
              await request(app).post("/category")
               .send({
                   name:"category123",
                   description:""
       })

       const response= await request(app).post("/category")
       .send({
           name:"category123",
           description:""
})
               expect(response.status).toBe(StatusCodes.BAD_REQUEST)
          
               })

})