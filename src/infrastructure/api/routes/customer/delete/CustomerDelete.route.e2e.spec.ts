import request from "supertest";
import ExpressConfig from "../../../express/express";
import DbFactory from "../../../../db/factory/DbFactory";
import {StatusCodes} from "http-status-codes";
import { Sequelize } from "sequelize-typescript";
import SequelizeDb from "../../../../db/sequelize/config/SequelizeDB";
describe("E2E test for delete customer",()=>{
 

     it("delete a customer",async()=>{
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
const response=await request(app).delete(`/customer/${findResponse.body.id}`)

expect(response.status).toBe(StatusCodes.OK)
     })

     it("delete a customer not exists",async()=>{
          const app=await ExpressConfig.execute()
          const response=await request(app).delete(`/customer/1`)

          expect(response.status).toBe(StatusCodes.BAD_REQUEST)
     
          })

})