import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ProductDeleteInDto from "../../../../../../use-case/checkout/product/delete/ProductDeleteInDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import ProductDeleteUseCase from "../../../../../../use-case/checkout/product/delete/ProductDeleteUseCase";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";



export default class ProductRouterDelete{


    async execute(req:Request<ProductDeleteInDto>,res:Response){
        const productRepository=DbFactoryRepositories.productRepository()
        const usecase= new ProductDeleteUseCase(productRepository)
        try {
            const request=req.params
            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const err= error as Error;
            const status=err instanceof NotificationError ? StatusCodes.BAD_REQUEST:StatusCodes.INTERNAL_SERVER_ERROR
            res.status(status).send(err.message)
        }
    }
}



