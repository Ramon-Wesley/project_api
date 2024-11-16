import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import CategoryFindAllInDto from "../../../../../../../use-case/checkout/category/findAll/CategoryFindAllInDto";
import CategoryFindAllUseCase from "../../../../../../../use-case/checkout/category/findAll/CategoryFindAllUseCase";
import DbFactoryRepositories from "../../../../../../db/factory/DbFactoryRepositories";
import { ErrorResponseMessage } from "../../../../@shared/ErrorResponseMessage";



export default class CategoryRouterFindAll{


    async execute(req:Request<{},{},{},CategoryFindAllInDto>,res:Response){
        
        try {
            const categoryRepository=DbFactoryRepositories.categoryRepository()
            const usecase= new CategoryFindAllUseCase(categoryRepository)
            const request:CategoryFindAllInDto={
                limit:Number(req.query.limit)|| 7,
                page:Number(req.query.page) || 1,
                filter:req.query.filter || "",
                sort:req.query.sort || "desc"
            }
        
            const result=await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }

    }

  
        
    
}



