import { Request, Response } from "express"
import { PurchaseOrderFindAllUseCase } from "../../../../../../use-case/checkout/purchaseOrder/findAll/PurchaseOrderFindAllUseCase"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import { PurchaseOrderFindAllInDto } from "../../../../../../use-case/checkout/purchaseOrder/findAll/PurchaseOrderFindAllInDto"
import { StatusCodes } from "http-status-codes"
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError"

export class PurchaseOrderRouteFindAll{

    async execute(req:Request<{},{},{},PurchaseOrderFindAllInDto>,res:Response){
        try {
            const purchaseOrderRepository=DbFactoryRepositories.purchaseOrderRepository()
            const usecase= new PurchaseOrderFindAllUseCase(purchaseOrderRepository)
            const query=req.query
            const result= await usecase.execute(query);
            res.status(StatusCodes.OK).send(result)
            
        } catch (error) {
            
            const err= error as Error;
            const status= err instanceof NotificationError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
            res.status(status).send(err.message)
        }
    }
}    