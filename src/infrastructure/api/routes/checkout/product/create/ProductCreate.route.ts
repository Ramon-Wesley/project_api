import {Request,Response} from "express"

import {StatusCodes} from "http-status-codes"
import ProductCreateInDto from "../../../../../../use-case/checkout/product/create/ProductCreateInDto"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import ProductCreateUseCase from "../../../../../../use-case/checkout/product/create/ProductCreateUseCase"


export default class ProductRouterCreate{
    async execute(req:Request<{},{},ProductCreateInDto>,res:Response){
        const productRepository=DbFactoryRepositories.productRepository()
        const categoryRepository=DbFactoryRepositories.categoryRepository()
        const usecase= new ProductCreateUseCase(productRepository,categoryRepository)
        
        try {
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

}



