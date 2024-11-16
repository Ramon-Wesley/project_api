import { Request,Response } from "express"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import { StatusCodes } from "http-status-codes"
import SalesOrderCreateUseCase from "../../../../../../use-case/checkout/salesOrder/create/SalesOrderCreateUseCase"
import { QueueFactory } from "../../../../../queue/factory/QueueFactory"
import {SalesOrderRouterCreateInDto } from "./SalesOrderRouterCreateInDto"
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage"

export default class PurchaseOrderRouterCreate{

    async execute(req:Request<{},{},SalesOrderRouterCreateInDto >,res:Response){
        try {
            const salesOrderRepository=DbFactoryRepositories.salesOrderRepository()
            const productRepository=DbFactoryRepositories.productRepository()
            const customerRepository=DbFactoryRepositories.customerRepository()
            const employeeRepository=DbFactoryRepositories.employeeRepository()
            const usecase= new SalesOrderCreateUseCase(salesOrderRepository,productRepository,customerRepository,employeeRepository)
            
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.OK).send()
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

}



