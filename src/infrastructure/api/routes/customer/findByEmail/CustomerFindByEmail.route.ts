import {Request,Response} from "express"
import CustomerRepositorySequelize from "../../../../db/sequelize/customer/repository/CustomerRepositorySequelize";
import {StatusCodes} from "http-status-codes"
import FindByEmailCustomerInDto from "../../../../../use-case/customer/findByEmail/FindByEmailCustomerInDto";
import FindByEmailCustomerUseCase from "../../../../../use-case/customer/findByEmail/findByEmailCustomerUseCase";
import DbFactory from "../../../../db/factory/DbFactory";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";


export default class CustomerRouterFindByEmail{

    async execute(req:Request<{},{},FindByEmailCustomerInDto>,res:Response){

        const customerRepository=DbFactoryRepositories.execute().customerRepository()
        const usecase= new FindByEmailCustomerUseCase(customerRepository)
        try {
            const request=req.body
            console.log(request)
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

  
        
    
}



