import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import CreateEmployeeInDto from "../../../../../use-case/employee/create/CreateEmployeeInDto";
import CreateEmployeeUseCase from "../../../../../use-case/employee/create/CreateEmployeeUseCase";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";

export default class EmployeeRouterCreate{
    async execute(req:Request<{},{},CreateEmployeeInDto>,res:Response){
        
        try {
            const employeeRepository=DbFactoryRepositories.employeeRepository()
            const usecase= new CreateEmployeeUseCase(employeeRepository)
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

}



