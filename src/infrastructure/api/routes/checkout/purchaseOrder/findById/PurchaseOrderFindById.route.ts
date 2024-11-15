import { StatusCodes } from "http-status-codes";
import { PurchaseOrderFindById } from "../../../../../../use-case/checkout/purchaseOrder/findById/PurchaseOrderFindById";
import { PurchaseOrderFindByIdINDto } from "../../../../../../use-case/checkout/purchaseOrder/findById/PurchaseOrderFindByIdINDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import { Request,Response } from "express";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";

export class PurchaseOrderRouterFindById{

    async execute(req:Request<PurchaseOrderFindByIdINDto>,res:Response){
        const purchaseOrderRepository=DbFactoryRepositories.purchaseOrderRepository()
        const usecase= new PurchaseOrderFindById(purchaseOrderRepository)
        try {
            const request=req.params.id
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const err= error as Error;
            const status= err instanceof NotificationError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
            res.status(status).send(err.message)
        }
    }
}