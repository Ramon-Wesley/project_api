import request  from "supertest"
import ExpressConfig from "../../../../../express/express"
import CategoryFindAllOutDto from "../../../../../../../use-case/checkout/category/findAll/CategoryFindAllOutDto"
import { StatusCodes } from "http-status-codes"

describe("E2E test find by id for category",()=>{
 

     it("find category by id",async()=>{
     const app=await ExpressConfig.execute()
     await request(app).post("/category")
        .send({
            name:"category123",
            description:"category description",
            isActive:true
})

     const responseAll=await request(app).get("/category?name=category123")
     const entity=responseAll.body as CategoryFindAllOutDto

    const response=await request(app).get(`/category/${entity.entity[0].id}`)


     expect(response.status).toBe(StatusCodes.OK)
     expect(response.body).toBeDefined()
     expect(response.body.name).toBe("category123")
     expect(response.body.description).toBe("category description")
     expect(response.body.isActive).toBeTruthy()
     })


     it("find a category not exists id",async()=>{
          const app=await ExpressConfig.execute()
          const response=await request(app).get(`/category/1`)
          expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        })

    })