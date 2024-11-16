import {Request,Response} from "express"
import CreateCustomerUseCase from "../../../../../use-case/customer/create/CreateCustomerUseCase";
import CustomerRepositorySequelize from "../../../../db/sequelize/customer/repository/CustomerRepositorySequelize";
import CreateCustomerInDto from "../../../../../use-case/customer/create/CreateCustomerInDto";
import {StatusCodes} from "http-status-codes"
import FindCustomerUseCase from "../../../../../use-case/customer/find/FindCustomerUseCase";
import FindCustomerINDto from "../../../../../use-case/customer/find/FindCustomerINDto";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";

export default class CustomerRouterFind{


    async execute(req:Request<FindCustomerINDto>,res:Response){
        try {
            const customerRepository=DbFactoryRepositories.customerRepository()
    
            const usecase= new FindCustomerUseCase(customerRepository)
            const request=req.params
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

  
        
    
}



