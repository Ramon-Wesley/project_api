import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import UpdateSupplierInDto from "../../../../../use-case/supplier/update/UpdateSupplierINDto";
import UpdateSupplierUseCase from "../../../../../use-case/supplier/update/UpdateSupplierUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";


export default class SupplierRouterUpdate{


    async execute(req:Request<{},{},UpdateSupplierInDto>,res:Response){
        const supplierRepository=DbFactoryRepositories.execute().supplierRepository()
        const usecase= new UpdateSupplierUseCase(supplierRepository)
        try {
            const request=req.body
            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

  
        
    
}



