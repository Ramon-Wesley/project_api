import request from "supertest";
import ExpressConfig from "../../../express/express";
import DbFactory from "../../../../db/factory/DbFactory";
import {StatusCodes} from "http-status-codes";
import { Sequelize } from "sequelize-typescript";
import SequelizeDb from "../../../../db/sequelize/config/SequelizeDB";
import RepositoryFindAllResult from "../../../../../domain/@shared/repository/RepositoryFindAllResult";
import FindAllEmployeeOutDto from "../../../../../use-case/employee/findAll/FindAllEmployeeOutDto";
describe("E2E test find all employee",()=>{
 

     it("find all employee",async()=>{
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
await request(app).post("/employee")
.send({
    name:"employee123",
    ra:"64081970",
    email:"employee2@hotmail.com",
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

     const response=await request(app).get("/employee")
     const entity=response.body as FindAllEmployeeOutDto
     expect(response.status).toBe(StatusCodes.OK)
     expect(response.body).toBeDefined()
     expect(entity.entity.length).toBe(2)
     expect(entity.number_of_elements).toBe(2)

     })

     it("find all employee not exists employees",async()=>{
        const app=await ExpressConfig.execute()

        const response=await request(app).get("/employee")
        const entity=response.body as FindAllEmployeeOutDto
        expect(response.status).toBe(StatusCodes.OK)
        expect(response.body).toBeDefined()
        expect(entity.entity.length).toBe(0)
        expect(entity.number_of_elements).toBe(0)
   
        })

  


        })