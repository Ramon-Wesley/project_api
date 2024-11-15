import {Request,Response} from "express"
import CreateCustomerUseCase from "../../../../../use-case/customer/create/CreateCustomerUseCase";
import CustomerRepositorySequelize from "../../../../db/sequelize/customer/repository/CustomerRepositorySequelize";
import CreateCustomerInDto from "../../../../../use-case/customer/create/CreateCustomerInDto";
import {StatusCodes} from "http-status-codes"
import UpdateCustomerInDto from "../../../../../use-case/customer/update/UpdateCustomerInDto";
import UpdateCustomerUseCase from "../../../../../use-case/customer/update/UpdateCustomerUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import FindCustomerINDto from "../../../../../use-case/customer/find/FindCustomerINDto";


export default class CustomerRouterUpdate{


    async execute(req:Request<FindCustomerINDto,{},UpdateCustomerInDto>,res:Response){
        const customerRepository=DbFactoryRepositories.customerRepository()
        const usecase= new UpdateCustomerUseCase(customerRepository)
        try {
            const request=req.body
            const id=req.params
            request.id=id.id
            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

  
        
    
}



