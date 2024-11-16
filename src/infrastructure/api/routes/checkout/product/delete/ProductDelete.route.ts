import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ProductDeleteInDto from "../../../../../../use-case/checkout/product/delete/ProductDeleteInDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import ProductDeleteUseCase from "../../../../../../use-case/checkout/product/delete/ProductDeleteUseCase";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage";



export default class ProductRouterDelete{


    async execute(req:Request<ProductDeleteInDto>,res:Response){
        try {
            const productRepository=DbFactoryRepositories.productRepository()
            const usecase= new ProductDeleteUseCase(productRepository)
            const request=req.params
            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }
}



