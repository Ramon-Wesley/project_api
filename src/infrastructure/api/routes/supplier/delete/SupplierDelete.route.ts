import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import DeleteSupplierInDto from "../../../../../use-case/supplier/delete/DeleteSupplierInDto";
import DeleteSupplierUseCase from "../../../../../use-case/supplier/delete/DeleteSupplierUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";

export default class SupplierRouterDelete{


    async execute(req:Request<DeleteSupplierInDto>,res:Response){
        try {
            const supplierRepository=DbFactoryRepositories.supplierRepository()
            const usecase= new DeleteSupplierUseCase(supplierRepository)
            const request=req.params
            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }
    
}



