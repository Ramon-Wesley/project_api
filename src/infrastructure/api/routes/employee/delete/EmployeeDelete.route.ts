import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import DeleteEmployeeInDto from "../../../../../use-case/employee/delete/DeleteEmployeeInDto";
import DeleteEmployeeUseCase from "../../../../../use-case/employee/delete/DeleteEmployeeUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";

export default class EmployeeRouterDelete{


    async execute(req:Request<DeleteEmployeeInDto>,res:Response){
        try {
            const employeeRepository=DbFactoryRepositories.employeeRepository()
            const usecase= new DeleteEmployeeUseCase(employeeRepository)
            const request=req.params
            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }
    
}



