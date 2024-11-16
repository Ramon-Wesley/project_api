import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import CreateSupplierInDto from "../../../../../use-case/supplier/create/CreateSupplierInDto";
import CreateSupplierUseCase from "../../../../../use-case/supplier/create/CreateSupplierUseCase";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";


export default class SupplierRouterCreate{
    async execute(req:Request<{},{},CreateSupplierInDto>,res:Response){
        
        try {
            const supplierRepository=DbFactoryRepositories.supplierRepository()
            const usecase= new CreateSupplierUseCase(supplierRepository)
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

}



