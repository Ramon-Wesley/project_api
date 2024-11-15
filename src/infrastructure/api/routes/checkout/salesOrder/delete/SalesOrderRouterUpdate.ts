import { StatusCodes } from "http-status-codes";
import { SalesOrderDeleteUseCase } from "../../../../../../use-case/checkout/salesOrder/delete/SalesOrderDeleteUseCase";
import { SalesOrderFindByIdINDto } from "../../../../../../use-case/checkout/salesOrder/findById/SalesOrderFindByIdINDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import { Request, Response } from "express";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";

export class SalesOrderDeleteRouter {
    execute(req:Request<SalesOrderFindByIdINDto>,res:Response) {
        
        const salesOrderRepository=DbFactoryRepositories.salesOrderRepository()
        const usecase= new SalesOrderDeleteUseCase(salesOrderRepository)
        try {
            const request=req.params as SalesOrderFindByIdINDto
            usecase.execute(request)
            res.status(StatusCodes.OK).send()
        } catch (error) {
            const err= error as Error;
            const status=error instanceof NotificationError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
            res.status(status).send(err.message)
        }
        }
    }
