import request, { CallbackHandler } from "supertest";
import ExpressConfig from "../../../express/express";
import {StatusCodes} from "http-status-codes";
import UpdateCustomerInDto from "../../../../../use-case/customer/update/UpdateCustomerInDto";

describe("E2E test update by id customer",()=>{
 

     it("update customer by id",async()=>{
     const app=await ExpressConfig.execute()
     await request(app).post("/customer")
     .send({
         name:"customer123",
         cpf:"640.819.000-60",
         email:"customer@hotmail.com",
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

const findResponse=await request(app).post("/customer/find/email")
.send({
 email:"customer@hotmail.com"
})

const result =findResponse.body as UpdateCustomerInDto;
result.name="customer1234"

  const response=await request(app).put(`/customer/${result.id}`)
  .send(result)

  const findResultUpdate=await request(app).get(`/customer/${result.id}`)

     expect(response.status).toBe(StatusCodes.OK)
     expect(findResultUpdate.body.name).toBe(result.name)
     expect(response.body).toBeDefined()

     })


     it("update a customer not exists id",async()=>{
          const app=await ExpressConfig.execute()
          const customer={
            id:"123",
            name:"customer123",
            cpf:"640.819.000-60",
            email:"customer@hotmail.com",
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
       
          const response=await request(app).put(`/customer/1`)
          .send(customer)
          
          expect(response.status).toBe(StatusCodes.BAD_REQUEST)
        })

    })