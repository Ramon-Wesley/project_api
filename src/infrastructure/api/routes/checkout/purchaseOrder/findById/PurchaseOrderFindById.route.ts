import { StatusCodes } from "http-status-codes";
import { PurchaseOrderFindById } from "../../../../../../use-case/checkout/purchaseOrder/findById/PurchaseOrderFindById";
import { PurchaseOrderFindByIdINDto } from "../../../../../../use-case/checkout/purchaseOrder/findById/PurchaseOrderFindByIdINDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import { Request,Response } from "express";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage";

export class PurchaseOrderRouterFindById{

    async execute(req:Request<PurchaseOrderFindByIdINDto>,res:Response){
        try {
            const purchaseOrderRepository=DbFactoryRepositories.purchaseOrderRepository()
            const usecase= new PurchaseOrderFindById(purchaseOrderRepository)
            const request=req.params.id
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }
}