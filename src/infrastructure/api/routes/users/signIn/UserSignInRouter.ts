import { Request,Response } from "express";
import { SignInDto } from "../../../../../use-case/user/signIn/SignInDto";
import { StatusCodes } from "http-status-codes";
import { SignInUseCase } from "../../../../../use-case/user/signIn/SignInUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";


export class UserSignInRouter{

    async execute(req:Request<{},{},SignInDto>, res:Response ){
        try {
            const useCase=new SignInUseCase(DbFactoryRepositories.userRepository())
            const request=req.body
            const response=await useCase.execute(request)
            return res.status(StatusCodes.OK).send(response)
        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).send(error +"batata")
        }
    }
    
}