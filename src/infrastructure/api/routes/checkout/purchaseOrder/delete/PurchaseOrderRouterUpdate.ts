import { StatusCodes } from "http-status-codes";
import { PurchaseOrderDeleteUseCase } from "../../../../../../use-case/checkout/purchaseOrder/delete/PurchaseOrderDeleteUseCase";
import { PurchaseOrderFindByIdINDto } from "../../../../../../use-case/checkout/purchaseOrder/findById/PurchaseOrderFindByIdINDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import { Request, Response } from "express";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";

export class PurchaseOrderDeleteRouter {
    execute(req:Request<PurchaseOrderFindByIdINDto>,res:Response) {
        
        const purchaseOrderRepository=DbFactoryRepositories.purchaseOrderRepository()
        const usecase= new PurchaseOrderDeleteUseCase(purchaseOrderRepository)
        try {
            const request=req.params as PurchaseOrderFindByIdINDto
            usecase.execute(request)
            res.status(StatusCodes.OK).send()
        } catch (error) {
            const err= error as Error;
            const status=error instanceof NotificationError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
            res.status(status).send(err.message)
        }
        }
    }
