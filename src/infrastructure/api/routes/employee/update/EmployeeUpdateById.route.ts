import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import UpdateEmployeeInDto from "../../../../../use-case/employee/update/UpdateEmployeeINDto";
import UpdateEmployeeUseCase from "../../../../../use-case/employee/update/UpdateEmployeeUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";


export default class EmployeeRouterUpdate{


    async execute(req:Request<{},{},UpdateEmployeeInDto>,res:Response){
        const employeeRepository=DbFactoryRepositories.employeeRepository()
        const usecase= new UpdateEmployeeUseCase(employeeRepository)
        try {
            const request=req.body
            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

  
        
    
}



