import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import CategoryCreateUseCase from "../../../../../use-case/checkout/category/create/CategoryCreateUseCase";
import CategoryCreateInDto from "../../../../../use-case/checkout/category/create/CategoryCreateInDto";
export default class CategoryRouterCreate{
    async execute(req:Request<{},{},CategoryCreateInDto>,res:Response){
        const categoryRepository=DbFactoryRepositories.execute().categoryRepository()
        const usecase= new CategoryCreateUseCase(categoryRepository)
        
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



