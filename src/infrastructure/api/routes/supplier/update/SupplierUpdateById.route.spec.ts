import request, { CallbackHandler } from "supertest";
import ExpressConfig from "../../../express/express";
import {StatusCodes} from "http-status-codes";
import UpdateSupplierOutDto from "../../../../../use-case/supplier/update/UpdateSupplierOutDto";

describe("E2E test update by id supplier",()=>{
 

     it("update supplier by id",async()=>{
     const app=await ExpressConfig.execute()
     await request(app).post("/supplier")
     .send({
         name:"supplier123",
         cnpj:"78.648.434/0001-90",
         email:"supplier@hotmail.com",
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

const findResponse=await request(app).post("/supplier/find/email")
.send({
 email:"supplier@hotmail.com"
})

const result =findResponse.body as UpdateSupplierOutDto;
result.name="supplier1234"

  const response=await request(app).put(`/supplier/${result.id}`)
  .send(result)

  const findResultUpdate=await request(app).get(`/supplier/${result.id}`)

     expect(response.status).toBe(StatusCodes.OK)
     expect(findResultUpdate.body.name).toBe(result.name)
     expect(response.body).toBeDefined()

     })


     it("update a supplier not exists id",async()=>{
          const app=await ExpressConfig.execute()
          const supplier={
            id:"123",
            name:"supplier123",
            cnpj:"78.648.434/0001-90",
            email:"supplier@hotmail.com",
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
       
          const response=await request(app).put(`/supplier/1`)
          .send(supplier)
          
          expect(response.status).toBe(StatusCodes.BAD_REQUEST)
        })

    })