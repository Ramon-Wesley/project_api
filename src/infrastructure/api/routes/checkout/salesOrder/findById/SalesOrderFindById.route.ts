
import { StatusCodes } from "http-status-codes";
import { SalesOrderFindById } from "../../../../../../use-case/checkout/salesOrder/findById/SalesOrderFindById";
import { SalesOrderFindByIdINDto } from "../../../../../../use-case/checkout/salesOrder/findById/SalesOrderFindByIdINDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import { Request,Response } from "express";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";

export class SalesOrderRouterFindById{

    async execute(req:Request<SalesOrderFindByIdINDto>,res:Response){
        const salesOrderRepository=DbFactoryRepositories.salesOrderRepository()
        const usecase= new SalesOrderFindById(salesOrderRepository)
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