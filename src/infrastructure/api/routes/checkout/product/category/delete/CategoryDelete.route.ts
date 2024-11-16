import { Request, Response } from "express";
import CategoryDeleteInDto from "../../../../../../../use-case/checkout/category/delete/CategoryDeleteInDto";
import DbFactoryRepositories from "../../../../../../db/factory/DbFactoryRepositories";
import CategoryDeleteUseCase from "../../../../../../../use-case/checkout/category/delete/CategoryDeleteUseCase";
import { StatusCodes } from "http-status-codes";
import NotificationError from "../../../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../../../@shared/ErrorResponseMessage";


export default class CategoryRouterDelete{


    async execute(req:Request<CategoryDeleteInDto>,res:Response){
        try {
            const categoryRepository=DbFactoryRepositories.categoryRepository()
            const usecase= new CategoryDeleteUseCase(categoryRepository)
            const request=req.params
            await usecase.execute(request);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }
}



