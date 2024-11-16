
import { StatusCodes } from "http-status-codes";
import { SalesOrderFindById } from "../../../../../../use-case/checkout/salesOrder/findById/SalesOrderFindById";
import { SalesOrderFindByIdINDto } from "../../../../../../use-case/checkout/salesOrder/findById/SalesOrderFindByIdINDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import { Request,Response } from "express";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage";

export class SalesOrderRouterFindById{

    async execute(req:Request<SalesOrderFindByIdINDto>,res:Response){
        try {
            const salesOrderRepository=DbFactoryRepositories.salesOrderRepository()
            const usecase= new SalesOrderFindById(salesOrderRepository)
            const request=req.params.id
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }
}