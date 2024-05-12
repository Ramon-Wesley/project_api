import {Request,Response} from "express"
import CreateCustomerUseCase from "../../../../../use-case/customer/create/CreateCustomerUseCase";
import CustomerRepositorySequelize from "../../../../db/sequelize/customer/repository/CustomerRepositorySequelize";
import CreateCustomerInDto from "../../../../../use-case/customer/create/CreateCustomerInDto";
import {StatusCodes} from "http-status-codes"
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import GenericRouterInterface from "../../@shared/GenericRouterInterface";
import ErrorResponseInterface from "../../@shared/ErrorResponseInterface";
import NotificationError from "../../../../../domain/@shared/notification/NotificationError";

export default class CustomerRouterCreate implements GenericRouterInterface<CreateCustomerInDto>{

    async  execute(req:Request<{},{},CreateCustomerInDto>,res:Response){
        const customerRepository=DbFactoryRepositories.customerRepository()
        const usecase= new CreateCustomerUseCase(customerRepository)
        try {
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()

        } catch (error) {
            const err=error as Error;
            const status=err instanceof NotificationError ? StatusCodes.BAD_REQUEST: StatusCodes.INTERNAL_SERVER_ERROR
            res.status(status).send(err)
        }

    }

}


