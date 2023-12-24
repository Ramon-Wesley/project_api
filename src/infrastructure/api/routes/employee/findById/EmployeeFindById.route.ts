import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import FindEmployeeUseCase from "../../../../../use-case/employee/find/FindEmployeeUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import FindEmployeeINDto from "../../../../../use-case/employee/find/FindEmployeeNDto";

export default class EmployeeRouterFind{


    async execute(req:Request<FindEmployeeINDto>,res:Response){
        const employeeRepository=DbFactoryRepositories.execute().employeeRepository()

        const usecase= new FindEmployeeUseCase(employeeRepository)
        try {
            const request=req.params
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }
    }    
}



