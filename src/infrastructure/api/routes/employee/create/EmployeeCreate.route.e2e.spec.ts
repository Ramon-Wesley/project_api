import request from "supertest";
import ExpressConfig from "../../../express/express";
import {StatusCodes} from "http-status-codes";

describe("E2E test for employee create",()=>{
 

     it("create a employee",async()=>{
     const app=await ExpressConfig.execute()
     const response=await request(app).post("/employee")
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
     expect(response.status).toBe(StatusCodes.CREATED)

     })

     it("create a employee with insufficient dates",async()=>{
          const app=await ExpressConfig.execute()
          const response=await request(app).post("/employee")
             .send({
                 name:"employee123"
     })
          expect(response.status).toBe(StatusCodes.BAD_REQUEST)
     
          })

          it("create a employee with duplicated email and Ra",async()=>{
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

       const response=await request(app).post("/employee")
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
               expect(response.status).toBe(StatusCodes.BAD_REQUEST)
          
               })

})