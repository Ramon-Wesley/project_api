import {Request,Response} from "express"
import CreateCustomerUseCase from "../../../../../use-case/customer/create/CreateCustomerUseCase";
import CustomerRepositorySequelize from "../../../../db/sequelize/customer/repository/CustomerRepositorySequelize";
import CreateCustomerInDto from "../../../../../use-case/customer/create/CreateCustomerInDto";
import {StatusCodes} from "http-status-codes"
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import GenericRouterInterface from "../../@shared/GenericRouterInterface";
import ErrorResponseInterface from "../../@shared/ErrorResponseInterface";
import NotificationError from "../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";

export default class CustomerRouterCreate implements GenericRouterInterface<CreateCustomerInDto>{

    async  execute(req:Request<{},{},CreateCustomerInDto>,res:Response){
        try {
            const customerRepository=DbFactoryRepositories.customerRepository()
            const usecase= new CreateCustomerUseCase(customerRepository)
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()

        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

}


