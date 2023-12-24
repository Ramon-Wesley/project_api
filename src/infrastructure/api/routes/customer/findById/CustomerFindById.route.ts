import {Request,Response} from "express"
import CreateCustomerUseCase from "../../../../../use-case/customer/create/CreateCustomerUseCase";
import CustomerRepositorySequelize from "../../../../db/sequelize/customer/repository/CustomerRepositorySequelize";
import CreateCustomerInDto from "../../../../../use-case/customer/create/CreateCustomerInDto";
import {StatusCodes} from "http-status-codes"
import FindCustomerUseCase from "../../../../../use-case/customer/find/FindCustomerUseCase";
import FindCustomerINDto from "../../../../../use-case/customer/find/FindCustomerINDto";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";

export default class CustomerRouterFind{


    async execute(req:Request<FindCustomerINDto>,res:Response){
        const customerRepository=DbFactoryRepositories.execute().customerRepository()

        const usecase= new FindCustomerUseCase(customerRepository)
        try {
            const request=req.params
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

  
        
    
}



