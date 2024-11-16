import { Request,Response } from "express"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import { StatusCodes } from "http-status-codes"
import SalesOrderUpdateInDto from "../../../../../../use-case/checkout/salesOrder/update/SalesOrderUpdateInDto"
import { SalesOrderFindByIdINDto } from "../../../../../../use-case/checkout/salesOrder/findById/SalesOrderFindByIdINDto"
import SalesOrderCreateUseCase from "../../../../../../use-case/checkout/salesOrder/create/SalesOrderCreateUseCase"
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage"

export default class PurchaseOrderRouterUpdate{
    async execute(req:Request<SalesOrderFindByIdINDto,{},SalesOrderUpdateInDto>,res:Response){
        try {
            const salesOrderRepository=DbFactoryRepositories.salesOrderRepository()
            const productRepository=DbFactoryRepositories.productRepository()
            const customerRepository=DbFactoryRepositories.customerRepository()
            const employeeRepository=DbFactoryRepositories.employeeRepository()
            const usecase= new SalesOrderCreateUseCase(salesOrderRepository,productRepository,customerRepository,employeeRepository)
            
        
            const request=req.body
            const id=req.params
            request.id=id.id
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

}



