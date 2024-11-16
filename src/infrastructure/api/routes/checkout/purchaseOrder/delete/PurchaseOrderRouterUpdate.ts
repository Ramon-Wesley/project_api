import { StatusCodes } from "http-status-codes";
import { PurchaseOrderDeleteUseCase } from "../../../../../../use-case/checkout/purchaseOrder/delete/PurchaseOrderDeleteUseCase";
import { PurchaseOrderFindByIdINDto } from "../../../../../../use-case/checkout/purchaseOrder/findById/PurchaseOrderFindByIdINDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import { Request, Response } from "express";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage";

export class PurchaseOrderDeleteRouter {
    execute(req:Request<PurchaseOrderFindByIdINDto>,res:Response) {
        
        try {
            const purchaseOrderRepository=DbFactoryRepositories.purchaseOrderRepository()
            const usecase= new PurchaseOrderDeleteUseCase(purchaseOrderRepository)
            const request=req.params as PurchaseOrderFindByIdINDto
            usecase.execute(request)
            res.status(StatusCodes.OK).send()
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)
            res.status(response.status).send(response)
        }
        }
    }
