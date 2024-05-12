import {Request,Response} from "express"

import {StatusCodes} from "http-status-codes"
import DbFactoryRepositories from "../../../../../../db/factory/DbFactoryRepositories";
import CategoryCreateInDto from "../../../../../../../use-case/checkout/category/create/CategoryCreateInDto";
import CategoryCreateUseCase from "../../../../../../../use-case/checkout/category/create/CategoryCreateUseCase";
import CategoryUpdateInDto from "../../../../../../../use-case/checkout/category/update/CategoryUpdateInDto";
import CategoryUpdateUseCase from "../../../../../../../use-case/checkout/category/update/CategoryUpdateUseCase";
import NotificationError from "../../../../../../../domain/@shared/notification/NotificationError";

export default class CategoryRouterUpdate{
    async execute(req:Request<{},{},CategoryUpdateInDto>,res:Response){
        const categoryRepository=DbFactoryRepositories.categoryRepository()
        const usecase= new CategoryUpdateUseCase(categoryRepository)
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



