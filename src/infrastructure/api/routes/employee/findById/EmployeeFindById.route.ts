import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import FindEmployeeUseCase from "../../../../../use-case/employee/find/FindEmployeeUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import FindEmployeeINDto from "../../../../../use-case/employee/find/FindEmployeeNDto";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";

export default class EmployeeRouterFind{


    async execute(req:Request<FindEmployeeINDto>,res:Response){
        try {
            const employeeRepository=DbFactoryRepositories.employeeRepository()
    
            const usecase= new FindEmployeeUseCase(employeeRepository)
            const request=req.params
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }    
}



