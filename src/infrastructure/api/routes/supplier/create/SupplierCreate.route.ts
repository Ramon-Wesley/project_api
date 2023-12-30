import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import CreateSupplierInDto from "../../../../../use-case/supplier/create/CreateSupplierInDto";
import CreateSupplierUseCase from "../../../../../use-case/supplier/create/CreateSupplierUseCase";


export default class SupplierRouterCreate{
    async execute(req:Request<{},{},CreateSupplierInDto>,res:Response){
        const supplierRepository=DbFactoryRepositories.execute().supplierRepository()
        const usecase= new CreateSupplierUseCase(supplierRepository)
        
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



