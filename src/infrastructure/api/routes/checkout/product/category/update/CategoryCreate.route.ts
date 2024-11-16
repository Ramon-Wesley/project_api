import {Request,Response} from "express"

import {StatusCodes} from "http-status-codes"
import DbFactoryRepositories from "../../../../../../db/factory/DbFactoryRepositories";
import CategoryCreateInDto from "../../../../../../../use-case/checkout/category/create/CategoryCreateInDto";
import CategoryCreateUseCase from "../../../../../../../use-case/checkout/category/create/CategoryCreateUseCase";
import CategoryUpdateInDto from "../../../../../../../use-case/checkout/category/update/CategoryUpdateInDto";
import CategoryUpdateUseCase from "../../../../../../../use-case/checkout/category/update/CategoryUpdateUseCase";
import NotificationError from "../../../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../../../@shared/ErrorResponseMessage";
import CategoryFindINDto from "../../../../../../../use-case/checkout/category/find/CategoryFindInDto";

export default class CategoryRouterUpdate{
    async execute(req:Request<CategoryFindINDto,{},CategoryUpdateInDto>,res:Response){
        try {
            const categoryRepository=DbFactoryRepositories.categoryRepository()
            const usecase= new CategoryUpdateUseCase(categoryRepository)
            const request=req.body
            request.id=req.params.id
            await usecase.execute(request)
            res.status(StatusCodes.OK).send()
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

}



