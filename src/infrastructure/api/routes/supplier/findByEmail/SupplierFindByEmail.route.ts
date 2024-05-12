import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import FindByEmailSupplierInDto from "../../../../../use-case/supplier/findByEmail/FindByEmailSupplierInDto";
import FindByEmailSupplierUseCase from "../../../../../use-case/supplier/findByEmail/findByEmailSupplierUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";


export default class SupplierRouterFindByEmail{

    async execute(req:Request<{},{},FindByEmailSupplierInDto>,res:Response){

        const supplierRepository=DbFactoryRepositories.supplierRepository()
        const usecase= new FindByEmailSupplierUseCase(supplierRepository)
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



