import e, { Request,Response } from "express"
import purchaseOrderCreateInDto from "../../../../../../use-case/checkout/purchaseOrder/create/PurchaseOrderCreateInDto"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import purchaseOrder from "../../../../../../domain/checkout/purchaseOrder/entity/PurchaseOrder"
import purchaseOrderCreateUseCase from "../../../../../../use-case/checkout/purchaseOrder/create/PurchaseOrderCreateUseCase"
import { StatusCodes } from "http-status-codes"
import purchaseOrderUpdateInDto from "../../../../../../use-case/checkout/purchaseOrder/update/PurchaseOrderUpdateInDto"
import purchaseOrderUpdateUseCase from "../../../../../../use-case/checkout/purchaseOrder/update/PurchaseOrderUpdateUseCase"
import { PurchaseOrderFindByIdINDto } from "../../../../../../use-case/checkout/purchaseOrder/findById/PurchaseOrderFindByIdINDto"
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage"
import ErrorResponseInterface from "../../../@shared/ErrorResponseInterface"

export default class PurchaseOrderRouterUpdate{
    async execute(req:Request<PurchaseOrderFindByIdINDto,{},purchaseOrderUpdateInDto>,res:Response){
        try {
            const purchaseOrderRepository=DbFactoryRepositories.purchaseOrderRepository()
            const productRepository=DbFactoryRepositories.productRepository()
            const supplierRepository=DbFactoryRepositories.supplierRepository()
            const employeeRepository=DbFactoryRepositories.employeeRepository()
        
            const usecase= new purchaseOrderUpdateUseCase(purchaseOrderRepository,productRepository,supplierRepository,employeeRepository)
            
            const request=req.body
            const id=req.params
            request.id=id.id
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()
        } catch (error ) {
            
            const response=ErrorResponseMessage.execute(error as Error)
            res.status(response.status).send(response)
        }

    }
    }




