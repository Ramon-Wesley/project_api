import {Request,Response} from "express"
import CreateCustomerUseCase from "../../../../../use-case/customer/create/CreateCustomerUseCase";
import CustomerRepositorySequelize from "../../../../db/sequelize/customer/repository/CustomerRepositorySequelize";
import CreateCustomerInDto from "../../../../../use-case/customer/create/CreateCustomerInDto";
import {StatusCodes} from "http-status-codes"
import UpdateCustomerInDto from "../../../../../use-case/customer/update/UpdateCustomerInDto";
import UpdateCustomerUseCase from "../../../../../use-case/customer/update/UpdateCustomerUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import FindCustomerINDto from "../../../../../use-case/customer/find/FindCustomerINDto";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";


export default class CustomerRouterUpdate{


    async execute(req:Request<FindCustomerINDto,{},UpdateCustomerInDto>,res:Response){
        try {
            const customerRepository=DbFactoryRepositories.customerRepository()
            const usecase= new UpdateCustomerUseCase(customerRepository)
            const id=req.params.id
            const request=req.body
            request.id=id
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()

        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

  
        
    
}



