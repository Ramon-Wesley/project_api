import request from "supertest";
import ExpressConfig from "../../../express/express";
import DbFactory from "../../../../db/factory/DbFactory";
import {StatusCodes} from "http-status-codes";
import { Sequelize } from "sequelize-typescript";
import SequelizeDb from "../../../../db/sequelize/config/SequelizeDB";
import RepositoryFindAllResult from "../../../../../domain/@shared/repository/RepositoryFindAllResult";
import FindAllCustomerOutDto from "../../../../../use-case/customer/findAll/FindAllCustomerOutDto";
describe("E2E test find all customer",()=>{
 

     it("find all customer",async()=>{
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
await request(app).post("/customer")
.send({
    name:"customer123",
    cpf:"687.970.570-70",
    email:"customer2@hotmail.com",
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

     const response=await request(app).get("/customer")
     const entity=response.body as FindAllCustomerOutDto
     expect(response.status).toBe(StatusCodes.OK)
     expect(response.body).toBeDefined()
     expect(entity.entity.length).toBe(2)
     expect(entity.number_of_elements).toBe(2)

     })

     it("find all customer not exists customers",async()=>{
        const app=await ExpressConfig.execute()

        const response=await request(app).get("/customer")
        const entity=response.body as FindAllCustomerOutDto
        expect(response.status).toBe(StatusCodes.OK)
        expect(response.body).toBeDefined()
        expect(entity.entity.length).toBe(0)
        expect(entity.number_of_elements).toBe(0)
   
        })

  


        })