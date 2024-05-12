import {Request,Response} from "express"
import DbFactoryRepositories from "../../../../../../db/factory/DbFactoryRepositories";
import CategoryFindUseCase from "../../../../../../../use-case/checkout/category/find/CategoryFindUseCase";
import CategoryFindINDto from "../../../../../../../use-case/checkout/category/find/CategoryFindInDto";
import { StatusCodes } from "http-status-codes";
import NotificationError from "../../../../../../../domain/@shared/notification/NotificationError";

export default class CategoryRouterFind{

    async execute(req:Request<CategoryFindINDto>,res:Response){
        const categoryRepository=DbFactoryRepositories.categoryRepository()

        const usecase= new CategoryFindUseCase(categoryRepository)
        try {
            const request=req.params
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const err= error as Error;
            const status= err instanceof NotificationError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
            res.status(status).send(err.message)
        }

    }

}



