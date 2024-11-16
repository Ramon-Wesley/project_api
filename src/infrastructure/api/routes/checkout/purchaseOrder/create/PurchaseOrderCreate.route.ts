import { Request,Response } from "express"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import { StatusCodes } from "http-status-codes"
import PurchaseOrderCreateUseCase from "../../../../../../use-case/checkout/purchaseOrder/create/PurchaseOrderCreateUseCase"
import { QueueFactory } from "../../../../../queue/factory/QueueFactory"
import {purchaseOrderRouterCreateInDto } from "./PurchaseOrderRouterCreateInDto"
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage"

export default class PurchaseOrderRouterCreate{

    async execute(req:Request<{},{},purchaseOrderRouterCreateInDto >,res:Response){
        try {
            const purchaseOrderRepository= DbFactoryRepositories.purchaseOrderRepository()
            const productRepository=DbFactoryRepositories.productRepository()
            const supplierRepository=DbFactoryRepositories.supplierRepository()
            const employeeRepository=DbFactoryRepositories.employeeRepository()
            const usecase= new PurchaseOrderCreateUseCase(purchaseOrderRepository,productRepository,supplierRepository,employeeRepository)
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.OK).send()
        } catch (error) { 
            const response=ErrorResponseMessage.execute(error as Error)
            res.status(response.status).send(response)
        }

    }

}



