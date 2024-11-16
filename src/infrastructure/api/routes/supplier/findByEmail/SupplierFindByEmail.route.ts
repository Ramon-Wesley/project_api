import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import FindByEmailSupplierInDto from "../../../../../use-case/supplier/findByEmail/FindByEmailSupplierInDto";
import FindByEmailSupplierUseCase from "../../../../../use-case/supplier/findByEmail/findByEmailSupplierUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";


export default class SupplierRouterFindByEmail{

    async execute(req:Request<{},{},FindByEmailSupplierInDto>,res:Response){

        try {
            const supplierRepository=DbFactoryRepositories.supplierRepository()
            const usecase= new FindByEmailSupplierUseCase(supplierRepository)
            const request=req.body
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }
    
}



