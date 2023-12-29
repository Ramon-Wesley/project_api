import request from "supertest";
import ExpressConfig from "../../../express/express";
import DbFactory from "../../../../db/factory/DbFactory";
import {StatusCodes} from "http-status-codes";
import { Sequelize } from "sequelize-typescript";
import SequelizeDb from "../../../../db/sequelize/config/SequelizeDB";
import RepositoryFindAllResult from "../../../../../domain/@shared/repository/RepositoryFindAllResult";
import FindAllSupplierOutDto from "../../../../../use-case/supplier/findAll/FindAllSupplierOutDto";
describe("E2E test find all supplier",()=>{
 

     it("find all supplier",async()=>{
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
await request(app).post("/supplier")
.send({
    name:"supplier123",
    cnpj:"56.336.125/0001-41",
    email:"supplier2@hotmail.com",
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

     const response=await request(app).get("/supplier")
     const entity=response.body as FindAllSupplierOutDto
     expect(response.status).toBe(StatusCodes.OK)
     expect(response.body).toBeDefined()
     expect(entity.entity.length).toBe(2)
     expect(entity.number_of_elements).toBe(2)

     })

     it("find all supplier not exists suppliers",async()=>{
        const app=await ExpressConfig.execute()

        const response=await request(app).get("/supplier")
        const entity=response.body as FindAllSupplierOutDto
        expect(response.status).toBe(StatusCodes.OK)
        expect(response.body).toBeDefined()
        expect(entity.entity.length).toBe(0)
        expect(entity.number_of_elements).toBe(0)
   
        })

  


        })