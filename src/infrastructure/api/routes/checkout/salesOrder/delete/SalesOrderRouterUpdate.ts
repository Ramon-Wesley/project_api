import { StatusCodes } from "http-status-codes";
import { SalesOrderDeleteUseCase } from "../../../../../../use-case/checkout/salesOrder/delete/SalesOrderDeleteUseCase";
import { SalesOrderFindByIdINDto } from "../../../../../../use-case/checkout/salesOrder/findById/SalesOrderFindByIdINDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import { Request, Response } from "express";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage";

export class SalesOrderDeleteRouter {
    execute(req:Request<SalesOrderFindByIdINDto>,res:Response) {
        
        try {
        const salesOrderRepository=DbFactoryRepositories.salesOrderRepository()
        const usecase= new SalesOrderDeleteUseCase(salesOrderRepository)
            const request=req.params as SalesOrderFindByIdINDto
            usecase.execute(request)
            res.status(StatusCodes.OK).send()
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }
}
