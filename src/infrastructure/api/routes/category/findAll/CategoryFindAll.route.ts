import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes"
import CategoryFindInDto from "../../../../../use-case/checkout/category/findAll/CategoryFindAllInDto";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import CategoryFindAllUseCase from "../../../../../use-case/checkout/category/findAll/CategoryFindAllUseCase";



export default class CategoryRouterFindAll{


    async execute(req:Request<{},{},{},CategoryFindInDto>,res:Response){
        const categoryRepository=DbFactoryRepositories.execute().categoryRepository()
        const usecase= new CategoryFindAllUseCase(categoryRepository)
        
        try {
            const request:CategoryFindInDto={
                limit:Number(req.query.limit)|| 7,
                page:Number(req.query.page) || 1,
                filter:req.query.filter || "",
                sort:req.query.sort || "desc"
            }
        
            const result=await usecase.execute(request);
            res.status(StatusCodes.OK).send(result);
        } catch (error) {
            const err= error as Error;
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }

    }

  
        
    
}



