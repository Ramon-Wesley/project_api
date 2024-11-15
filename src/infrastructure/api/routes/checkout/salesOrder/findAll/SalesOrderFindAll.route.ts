import { Request, Response } from "express"
import { SalesOrderFindAllUseCase } from "../../../../../../use-case/checkout/salesOrder/findAll/SalesOrderFindAllUseCase"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import { SalesOrderFindAllInDto } from "../../../../../../use-case/checkout/salesOrder/findAll/SalesOrderFindAllInDto"
import { StatusCodes } from "http-status-codes"
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError"

export class SalesOrderRouteFindAll{

    async execute(req:Request<{},{},{},SalesOrderFindAllInDto>,res:Response){
        try {
            const salesOrderRepository=DbFactoryRepositories.salesOrderRepository()
            const usecase= new SalesOrderFindAllUseCase(salesOrderRepository)
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