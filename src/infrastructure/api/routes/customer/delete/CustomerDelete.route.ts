import {Request,Response} from "express"
import CreateCustomerUseCase from "../../../../../use-case/customer/create/CreateCustomerUseCase";
import CustomerRepositorySequelize from "../../../../db/sequelize/customer/repository/CustomerRepositorySequelize";
import CreateCustomerInDto from "../../../../../use-case/customer/create/CreateCustomerInDto";
import {StatusCodes} from "http-status-codes"
import FindCustomerUseCase from "../../../../../use-case/customer/find/FindCustomerUseCase";
import FindCustomerINDto from "../../../../../use-case/customer/find/FindCustomerINDto";
import DeleteCustomerInDto from "../../../../../use-case/customer/delete/DeleteCustomerInDto";
import DeleteCustomerUseCase from "../../../../../use-case/customer/delete/DeleteCustomerUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";

export default class CustomerRouterDelete{


    async execute(req:Request<DeleteCustomerInDto>,res:Response){
        try {
            const customerRepository=DbFactoryRepositories.customerRepository()
            const usecase= new DeleteCustomerUseCase(customerRepository)
            const params=req.params
            await usecase.execute(params);
            res.status(StatusCodes.OK).send()

        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

  
        
    
}



