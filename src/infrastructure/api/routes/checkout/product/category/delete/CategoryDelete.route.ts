import { Request, Response } from "express";
import CategoryDeleteInDto from "../../../../../../../use-case/checkout/category/delete/CategoryDeleteInDto";
import DbFactoryRepositories from "../../../../../../db/factory/DbFactoryRepositories";
import CategoryDeleteUseCase from "../../../../../../../use-case/checkout/category/delete/CategoryDeleteUseCase";
import { StatusCodes } from "http-status-codes";
import NotificationError from "../../../../../../../domain/@shared/notification/NotificationError";


export default class CategoryRouterDelete{


    async execute(req:Request<CategoryDeleteInDto>,res:Response){
        const categoryRepository=DbFactoryRepositories.categoryRepository()
        const usecase= new CategoryDeleteUseCase(categoryRepository)
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



