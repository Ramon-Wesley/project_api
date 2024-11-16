import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import FindSupplierUseCase from "../../../../../use-case/supplier/find/FindSupplierUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import FindSupplierINDto from "../../../../../use-case/supplier/find/FindSupplierInDto";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";


export default class SupplierRouterFind{


    async execute(req:Request<FindSupplierINDto>,res:Response){
        try {
            const supplierRepository=DbFactoryRepositories.supplierRepository()
    
            const usecase= new FindSupplierUseCase(supplierRepository)
            const request=req.params
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }    
}



