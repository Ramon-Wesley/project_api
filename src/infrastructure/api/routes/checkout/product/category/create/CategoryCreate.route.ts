import {Request,Response} from "express"

import {StatusCodes} from "http-status-codes"
import DbFactoryRepositories from "../../../../../../db/factory/DbFactoryRepositories";
import CategoryCreateInDto from "../../../../../../../use-case/checkout/category/create/CategoryCreateInDto";
import CategoryCreateUseCase from "../../../../../../../use-case/checkout/category/create/CategoryCreateUseCase";
import { ErrorResponseMessage } from "../../../../@shared/ErrorResponseMessage";

export default class CategoryRouterCreate{
    async execute(req:Request<{},{},CategoryCreateInDto>,res:Response){
        try {
            const categoryRepository=DbFactoryRepositories.categoryRepository()
            const usecase= new CategoryCreateUseCase(categoryRepository)
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)
            res.status(response.status).send(response)
        }

    }

}



