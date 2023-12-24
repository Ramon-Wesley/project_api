import request, { CallbackHandler } from "supertest";
import ExpressConfig from "../../../express/express";
import {StatusCodes} from "http-status-codes";
import UpdateEmployeeOutDto from "../../../../../use-case/employee/update/UpdateEmployeeOutDto";

describe("E2E test update by id employee",()=>{
 

     it("update employee by id",async()=>{
     const app=await ExpressConfig.execute()
     await request(app).post("/employee")
     .send({
         name:"employee123",
         ra:"64081900",
         email:"employee@hotmail.com",
         date_of_birth:new Date(),
         address:{
         uf:"mg",
         city:"belo oriente",
         neighborhood:"floresta",
         zipCode:"35170-301",
         street:"magalhaes pinto",
         number:"123",
         description:""
     },
     isActive:true
})

const findResponse=await request(app).post("/employee/find/email")
.send({
 email:"employee@hotmail.com"
})

const result =findResponse.body as UpdateEmployeeOutDto;
result.name="employee1234"

  const response=await request(app).put(`/employee/${result.id}`)
  .send(result)

  const findResultUpdate=await request(app).get(`/employee/${result.id}`)

     expect(response.status).toBe(StatusCodes.OK)
     expect(findResultUpdate.body.name).toBe(result.name)
     expect(response.body).toBeDefined()

     })


     it("update a employee not exists id",async()=>{
          const app=await ExpressConfig.execute()
          const employee={
            id:"123",
            name:"employee123",
            ra:"64081900",
            email:"employee@hotmail.com",
            date_of_birth:new Date(),
            address:{
            uf:"mg",
            city:"belo oriente",
            neighborhood:"floresta",
            zipCode:"35170-301",
            street:"magalhaes pinto",
            number:"123",
            description:""
        },
        isActive:true
   }
       
          const response=await request(app).put(`/employee/1`)
          .send(employee)
          
          expect(response.status).toBe(StatusCodes.BAD_REQUEST)
        })

    })