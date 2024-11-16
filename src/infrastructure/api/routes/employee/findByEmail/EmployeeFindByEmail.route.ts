import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import FindByEmailEmployeeInDto from "../../../../../use-case/employee/findByEmail/FindByEmailEmployeeInDto";
import FindByEmailEmployeeUseCase from "../../../../../use-case/employee/findByEmail/findByEmailEmployeeUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";


export default class EmployeeRouterFindByEmail{

    async execute(req:Request<{},{},FindByEmailEmployeeInDto>,res:Response){

        try {
            const employeeRepository=DbFactoryRepositories.employeeRepository()
            const usecase= new FindByEmailEmployeeUseCase(employeeRepository)
            const request=req.body
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }
    
}



