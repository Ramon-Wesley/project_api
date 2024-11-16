import {Request,Response} from "express"
import { StatusCodes } from "http-status-codes";
import ProductFindUseCase from "../../../../../../use-case/checkout/product/find/ProductFindUseCase";
import ProductFindINDto from "../../../../../../use-case/checkout/product/find/ProductFindInDto";
import DbFactoryRepositories from "../../../../../db/factory/DbFactoryRepositories";
import NotificationError from "../../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../../@shared/ErrorResponseMessage";

export default class ProductRouterFind{

    async execute(req:Request<ProductFindINDto>,res:Response){
        try {
            const productRepository=DbFactoryRepositories.productRepository()
    
            const usecase= new ProductFindUseCase(productRepository)
            const request=req.params
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

}



