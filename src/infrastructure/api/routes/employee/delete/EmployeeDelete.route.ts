import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import DeleteEmployeeInDto from "../../../../../use-case/employee/delete/DeleteEmployeeInDto";
import DeleteEmployeeUseCase from "../../../../../use-case/employee/delete/DeleteEmployeeUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";

export default class EmployeeRouterDelete{


    async execute(req:Request<DeleteEmployeeInDto>,res:Response){
        const employeeRepository=DbFactoryRepositories.employeeRepository()
        const usecase= new DeleteEmployeeUseCase(employeeRepository)
        try {
            const request=req.params
            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }
    
}



