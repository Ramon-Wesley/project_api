import {Request,Response} from "express"

import {StatusCodes} from "http-status-codes"
import ProductCreateInDto from "../../../../../../use-case/checkout/products/create/ProductCreateInDto"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import ProductCreateUseCase from "../../../../../../use-case/checkout/products/create/ProductCreateUseCase"


export default class ProductRouterCreate{
    async execute(req:Request<{},{},ProductCreateInDto>,res:Response){
        const productRepository=DbFactoryRepositories.execute().productRepository()
        const usecase= new ProductCreateUseCase(productRepository)
        
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



