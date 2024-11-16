import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import UpdateSupplierInDto from "../../../../../use-case/supplier/update/UpdateSupplierINDto";
import UpdateSupplierUseCase from "../../../../../use-case/supplier/update/UpdateSupplierUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";
import FindSupplierINDto from "../../../../../use-case/supplier/find/FindSupplierInDto";


export default class SupplierRouterUpdate{


    async execute(req:Request<FindSupplierINDto,{},UpdateSupplierInDto>,res:Response){
        try {
            const supplierRepository=DbFactoryRepositories.supplierRepository()
            const usecase= new UpdateSupplierUseCase(supplierRepository)
            const request=req.body
            request.id=req.params.id
            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

  
        
    
}



