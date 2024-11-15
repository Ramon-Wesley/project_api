import { Request,Response } from "express"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import { StatusCodes } from "http-status-codes"
import SalesOrderCreateUseCase from "../../../../../../use-case/checkout/salesOrder/create/SalesOrderCreateUseCase"
import { QueueFactory } from "../../../../../queue/factory/QueueFactory"
import {SalesOrderRouterCreateInDto } from "./SalesOrderRouterCreateInDto"

export default class PurchaseOrderRouterCreate{

    async execute(req:Request<{},{},SalesOrderRouterCreateInDto >,res:Response){
        const salesOrderRepository=DbFactoryRepositories.salesOrderRepository()
        const productRepository=DbFactoryRepositories.productRepository()
        const customerRepository=DbFactoryRepositories.customerRepository()
        const employeeRepository=DbFactoryRepositories.employeeRepository()
        const usecase= new SalesOrderCreateUseCase(salesOrderRepository,productRepository,customerRepository,employeeRepository)
        
        try {
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.OK).send()
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

}



