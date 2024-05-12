import {Request,Response} from "express"
import CreateCustomerUseCase from "../../../../../use-case/customer/create/CreateCustomerUseCase";
import CustomerRepositorySequelize from "../../../../db/sequelize/customer/repository/CustomerRepositorySequelize";

import {StatusCodes} from "http-status-codes"
import FindAllCustomerInDto from "../../../../../use-case/customer/findAll/FindAllCustomerInDto";
import FindAllCustomerUseCase from "../../../../../use-case/customer/findAll/FindAllCustomerUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";


export default class CustomerRouterFindAll{


    async execute(req:Request<{},{},{},FindAllCustomerInDto>,res:Response){
        
        const customerRepository=DbFactoryRepositories.customerRepository()

        const usecase= new FindAllCustomerUseCase(customerRepository)
        
        try {
            const request:FindAllCustomerInDto={
                limit:Number(req.query.limit)|| 7,
                page:Number(req.query.page) || 1,
                filter:req.query.filter || "",
                sort:req.query.sort || "desc"
            }
        
            const result=await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

  
        
    
}



