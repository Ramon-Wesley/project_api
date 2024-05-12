import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import ProductFindAllInDto from "../../../../../../use-case/checkout/product/findAll/ProductFindAllInDto"
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories"
import ProductFindAllUseCase from "../../../../../../use-case/checkout/product/findAll/ProductFindAllUseCase"
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError"




export default class ProductRouterFindAll{


    async execute(req:Request<{},{},{},ProductFindAllInDto>,res:Response){
        const productRepository=DbFactoryRepositories.productRepository()
        const usecase= new ProductFindAllUseCase(productRepository)
        
        try {
            const request:ProductFindAllInDto={
                limit:Number(req.query.limit)|| 7,
                page:Number(req.query.page) || 1,
                filter:req.query.filter || "",
                sort:req.query.sort || "desc"
            }
        
            const result=await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const err= error as Error;
            const status= error instanceof NotificationError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
            res.status(status).send(err.message)
        }

    }

  
        
    
}



