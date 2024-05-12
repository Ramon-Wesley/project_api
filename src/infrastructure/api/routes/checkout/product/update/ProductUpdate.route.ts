import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import ProductUpdateInDto from "../../../../../../use-case/checkout/product/update/ProductUpdateInDto"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import ProductUpdateUseCase from "../../../../../../use-case/checkout/product/update/ProductUpdateUseCase"
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError"


export default class ProductRouterUpdate{
    async execute(req:Request<{},{},ProductUpdateInDto>,res:Response){
        const productRepository=DbFactoryRepositories.productRepository()
        const categoryRepository=DbFactoryRepositories.categoryRepository()
        const usecase= new ProductUpdateUseCase(productRepository,categoryRepository)
        try {
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.OK).send()
        } catch (error) {
            const err= error as Error;
            const status=error instanceof NotificationError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
            res.status(status).send(err.message)
        }

    }

}



