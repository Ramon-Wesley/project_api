import {Request,Response} from "express"
import CreateEmployeeUseCase from "../../../../../use-case/employee/create/CreateEmployeeUseCase";
import EmployeeRepositorySequelize from "../../../../db/sequelize/employee/repository/EmployeeRepositorySequelize";

import {StatusCodes} from "http-status-codes"
import FindAllEmployeeInDto from "../../../../../use-case/employee/findAll/FindAllEmployeeInDto";
import FindAllEmployeeUseCase from "../../../../../use-case/employee/findAll/FindAllEmployeeUseCase";


export default class EmployeeRouterFindAll{


    async execute(req:Request<{},{},{},FindAllEmployeeInDto>,res:Response){
        
        const usecase= new FindAllEmployeeUseCase(new EmployeeRepositorySequelize())
        
        try {
            const request:FindAllEmployeeInDto={
                limit:Number(req.query.limit)|| 7,
                page:Number(req.query.page) || 1,
                filter:req.query.filter || "",
                sort:req.query.sort || "desc"
            }
        
            const result=await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

  
        
    
}



