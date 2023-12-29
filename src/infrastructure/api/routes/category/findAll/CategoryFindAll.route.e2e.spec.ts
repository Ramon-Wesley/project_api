import request from "supertest";
import ExpressConfig from "../../../express/express";
import {StatusCodes} from "http-status-codes";
import CategoryFindAllOutDto from "../../../../../use-case/checkout/category/findAll/CategoryFindAllOutDto";

describe("E2E test find all category",()=>{
 

     it("find all category",async()=>{
     const app=await ExpressConfig.execute()
     await request(app).post("/category")
        .send({
            name:"category123",
            description:""
})

await request(app).post("/category")
.send({
    name:"category1234",
    description:""
})


     const response=await request(app).get("/category")
     const entity=response.body as CategoryFindAllOutDto
     expect(response.status).toBe(StatusCodes.OK)
     expect(response.body).toBeDefined()
     expect(entity.entity.length).toBe(2)
     expect(entity.number_of_elements).toBe(2)

     })

     it("find all category not exists categories",async()=>{
        const app=await ExpressConfig.execute()

        const response=await request(app).get("/category")
        const entity=response.body as CategoryFindAllOutDto
        expect(response.status).toBe(StatusCodes.OK)
        expect(response.body).toBeDefined()
        expect(entity.entity.length).toBe(0)
        expect(entity.number_of_elements).toBe(0)
   
        })

  


        })