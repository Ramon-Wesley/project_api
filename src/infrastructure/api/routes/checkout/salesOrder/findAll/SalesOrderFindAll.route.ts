import { Request, Response } from "express"
import { SalesOrderFindAllUseCase } from "../../../../../../use-case/checkout/salesOrder/findAll/SalesOrderFindAllUseCase"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import { SalesOrderFindAllInDto } from "../../../../../../use-case/checkout/salesOrder/findAll/SalesOrderFindAllInDto"
import { StatusCodes } from "http-status-codes"
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError"
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage"

export class SalesOrderRouteFindAll{

    async execute(req:Request<{},{},{},SalesOrderFindAllInDto>,res:Response){
        try {
            const salesOrderRepository=DbFactoryRepositories.salesOrderRepository()
            const usecase= new SalesOrderFindAllUseCase(salesOrderRepository)
            const query=req.query
            const result= await usecase.execute(query);
            res.status(StatusCodes.OK).send(result)
            
        } catch (error) {
            
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }
}    