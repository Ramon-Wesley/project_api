import { Request, Response } from "express"
import { PurchaseOrderFindAllUseCase } from "../../../../../../use-case/checkout/purchaseOrder/findAll/PurchaseOrderFindAllUseCase"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import { PurchaseOrderFindAllInDto } from "../../../../../../use-case/checkout/purchaseOrder/findAll/PurchaseOrderFindAllInDto"
import { StatusCodes } from "http-status-codes"
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError"
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage"

export class PurchaseOrderRouteFindAll{

    async execute(req:Request<{},{},{},PurchaseOrderFindAllInDto>,res:Response){
        try {
            const purchaseOrderRepository=DbFactoryRepositories.purchaseOrderRepository()
            const usecase= new PurchaseOrderFindAllUseCase(purchaseOrderRepository)
            const query=req.query
            const result= await usecase.execute(query);
            res.status(StatusCodes.OK).send(result)
            
        } catch (error) {
            
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }
}    