import { Request,Response } from "express"
import { ForgotPasswordInDto } from "../../../../../use-case/user/forgotPassword/ForgotPasswordInDto"
import { ForgotPasswordUseCase } from "../../../../../use-case/user/forgotPassword/ForgotPasswordUseCase"
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { StatusCodes } from "http-status-codes";

export class ForgotPasswordRouter{
    async execute(req:Request<{},{},ForgotPasswordInDto>,res:Response){
        const {email}=req.body
        const userRepository=DbFactoryRepositories.userRepository();
        const forgotPasswordUseCase=new ForgotPasswordUseCase(userRepository)
        try {
            const response=await forgotPasswordUseCase.execute({email})
            res.status(StatusCodes.OK).send(response)   
        } catch (error) {
            const err=error as Error
            res.status(StatusCodes.BAD_REQUEST).send(err.message)
        }
    }
}