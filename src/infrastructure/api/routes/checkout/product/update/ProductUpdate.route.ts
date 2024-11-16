import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import ProductUpdateInDto from "../../../../../../use-case/checkout/product/update/ProductUpdateInDto"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import ProductUpdateUseCase from "../../../../../../use-case/checkout/product/update/ProductUpdateUseCase"
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError"
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage"
import ProductFindINDto from "../../../../../../use-case/checkout/product/find/ProductFindInDto"


export default class ProductRouterUpdate{
    async execute(req:Request<ProductFindINDto,{},ProductUpdateInDto>,res:Response){
        try {
            const productRepository=DbFactoryRepositories.productRepository()
            const categoryRepository=DbFactoryRepositories.categoryRepository()
            const usecase= new ProductUpdateUseCase(productRepository,categoryRepository)
            const request=req.body
            request.id=req.params.id
            await usecase.execute(request)
            res.status(StatusCodes.OK).send()
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

}



