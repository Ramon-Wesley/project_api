import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import UpdateEmployeeInDto from "../../../../../use-case/employee/update/UpdateEmployeeINDto";
import UpdateEmployeeUseCase from "../../../../../use-case/employee/update/UpdateEmployeeUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";
import FindEmployeeINDto from "../../../../../use-case/employee/find/FindEmployeeNDto";


export default class EmployeeRouterUpdate{


    async execute(req:Request<FindEmployeeINDto,{},UpdateEmployeeInDto>,res:Response){
        try {
            const employeeRepository=DbFactoryRepositories.employeeRepository()
            const usecase= new UpdateEmployeeUseCase(employeeRepository)
            const request=req.body
            request.id=req.params.id

            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

  
        
    
}



