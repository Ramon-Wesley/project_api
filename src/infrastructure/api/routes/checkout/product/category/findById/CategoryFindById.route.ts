import {Request,Response} from "express"
import DbFactoryRepositories from "../../../../../../db/factory/DbFactoryRepositories";
import CategoryFindUseCase from "../../../../../../../use-case/checkout/category/find/CategoryFindUseCase";
import CategoryFindINDto from "../../../../../../../use-case/checkout/category/find/CategoryFindInDto";
import { StatusCodes } from "http-status-codes";
import NotificationError from "../../../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../../../@shared/ErrorResponseMessage";

export default class CategoryRouterFind{

    async execute(req:Request<CategoryFindINDto>,res:Response){
        try {
            const categoryRepository=DbFactoryRepositories.categoryRepository()
    
            const usecase= new CategoryFindUseCase(categoryRepository)
            const request=req.params
            const result= await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

}



