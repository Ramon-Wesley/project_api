import request from "supertest";
import ExpressConfig from "../../../express/express";
import DbFactory from "../../../../db/factory/DbFactory";
import {StatusCodes} from "http-status-codes";
import { Sequelize } from "sequelize-typescript";
import SequelizeDb from "../../../../db/sequelize/config/SequelizeDB";
describe("E2E test find by id for supplier",()=>{
 

     it("find supplier by id",async()=>{
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

const response=await request(app).get(`/supplier/${findResponse.body.id}`)


     expect(response.status).toBe(StatusCodes.OK)
     expect(response.body).toBeDefined()

     })


     it("find a supplier not exists id",async()=>{
          const app=await ExpressConfig.execute()
       
          const response=await request(app).get(`/supplier/1`)


          expect(response.status).toBe(StatusCodes.BAD_REQUEST)



        })

    })