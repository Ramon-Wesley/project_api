import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import FindSupplierUseCase from "../../../../../use-case/supplier/find/FindSupplierUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import FindSupplierINDto from "../../../../../use-case/supplier/find/FindSupplierInDto";


export default class SupplierRouterFind{


    async execute(req:Request<FindSupplierINDto>,res:Response){
        const supplierRepository=DbFactoryRepositories.supplierRepository()

        const usecase= new FindSupplierUseCase(supplierRepository)
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



