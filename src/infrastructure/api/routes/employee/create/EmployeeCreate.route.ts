import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import CreateEmployeeInDto from "../../../../../use-case/employee/create/CreateEmployeeInDto";
import CreateEmployeeUseCase from "../../../../../use-case/employee/create/CreateEmployeeUseCase";

export default class EmployeeRouterCreate{
    async execute(req:Request<{},{},CreateEmployeeInDto>,res:Response){
        const employeeRepository=DbFactoryRepositories.execute().employeeRepository()
        const usecase= new CreateEmployeeUseCase(employeeRepository)
        
        try {
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

}



