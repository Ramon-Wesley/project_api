import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import DeleteSupplierInDto from "../../../../../use-case/supplier/delete/DeleteSupplierInDto";
import DeleteSupplierUseCase from "../../../../../use-case/supplier/delete/DeleteSupplierUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";

export default class SupplierRouterDelete{


    async execute(req:Request<DeleteSupplierInDto>,res:Response){
        const supplierRepository=DbFactoryRepositories.supplierRepository()
        const usecase= new DeleteSupplierUseCase(supplierRepository)
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



