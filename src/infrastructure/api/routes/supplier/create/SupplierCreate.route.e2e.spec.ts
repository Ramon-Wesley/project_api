import request from "supertest";
import ExpressConfig from "../../../express/express";
import {StatusCodes} from "http-status-codes";

describe("E2E test for supplier create",()=>{
 

     it("create a supplier",async()=>{
     const app=await ExpressConfig.execute()
     const response=await request(app).post("/supplier")
        .send({
            name:"supplier123",
            cnpj:"81.068.313/0001-83",
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
     expect(response.status).toBe(StatusCodes.CREATED)

     })

     it("create a supplier with insufficient dates",async()=>{
          const app=await ExpressConfig.execute()
          const response=await request(app).post("/supplier")
             .send({
                 name:"supplier123"
     })
          expect(response.status).toBe(StatusCodes.BAD_REQUEST)
     
          })

          it("create a supplier with duplicated email and Cnpj",async()=>{
               const app=await ExpressConfig.execute()
              await request(app).post("/supplier")
               .send({
                   name:"supplier123",
                   cnpj:"81.068.313/0001-83",
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

       const response=await request(app).post("/supplier")
               .send({
                   name:"supplier123",
                   cnpj:"81.068.313/0001-83",
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
               expect(response.status).toBe(StatusCodes.BAD_REQUEST)
          
               })

})