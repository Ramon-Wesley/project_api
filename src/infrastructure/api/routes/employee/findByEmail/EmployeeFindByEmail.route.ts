import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import FindByEmailEmployeeInDto from "../../../../../use-case/employee/findByEmail/FindByEmailEmployeeInDto";
import FindByEmailEmployeeUseCase from "../../../../../use-case/employee/findByEmail/findByEmailEmployeeUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";


export default class EmployeeRouterFindByEmail{

    async execute(req:Request<{},{},FindByEmailEmployeeInDto>,res:Response){

        const employeeRepository=DbFactoryRepositories.execute().employeeRepository()
        const usecase= new FindByEmailEmployeeUseCase(employeeRepository)
        try {
            const request=req.body
            console.log(request)
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }
    
}



