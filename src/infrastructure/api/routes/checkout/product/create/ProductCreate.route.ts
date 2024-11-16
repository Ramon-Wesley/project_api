import {Request,Response} from "express"

import {StatusCodes} from "http-status-codes"
import ProductCreateInDto from "../../../../../../use-case/checkout/product/create/ProductCreateInDto"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import ProductCreateUseCase from "../../../../../../use-case/checkout/product/create/ProductCreateUseCase"
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage"


export default class ProductRouterCreate{
    async execute(req:Request<{},{},ProductCreateInDto>,res:Response){
        
        try {
            const productRepository=DbFactoryRepositories.productRepository()
            const categoryRepository=DbFactoryRepositories.categoryRepository()
            const usecase= new ProductCreateUseCase(productRepository,categoryRepository)
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

}



