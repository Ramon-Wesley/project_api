import {Request,Response} from "express"
import CreateSupplierUseCase from "../../../../../use-case/supplier/create/CreateSupplierUseCase";
import SupplierRepositorySequelize from "../../../../db/sequelize/supplier/repository/SupplierRepositorySequelize";

import {StatusCodes} from "http-status-codes"
import FindAllSupplierInDto from "../../../../../use-case/supplier/findAll/FindAllSupplierInDto";
import FindAllSupplierUseCase from "../../../../../use-case/supplier/findAll/FindAllSupplierUseCase";
import DbFactory from "../../../../db/factory/DbFactory";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";


export default class SupplierRouterFindAll{


    async execute(req:Request<{},{},{},FindAllSupplierInDto>,res:Response){
        
        try {
            const supplierRepository=DbFactoryRepositories.supplierRepository()
            
            const usecase= new FindAllSupplierUseCase(supplierRepository)
            const request:FindAllSupplierInDto={
                limit:Number(req.query.limit)|| 7,
                page:Number(req.query.page) || 1,
                filter:req.query.filter || "",
                sort:req.query.sort || "desc"
            }
        
            const result=await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

  
        
    
}



