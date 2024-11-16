import { Request,Response } from "express"
import { ForgotPasswordInDto } from "../../../../../use-case/user/forgotPassword/ForgotPasswordInDto"
import { ForgotPasswordUseCase } from "../../../../../use-case/user/forgotPassword/ForgotPasswordUseCase"
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import { StatusCodes } from "http-status-codes";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";

export class ForgotPasswordRouter{
    async execute(req:Request<{},{},ForgotPasswordInDto>,res:Response){
        try {
            const {email}=req.body
            const userRepository=DbFactoryRepositories.userRepository();
            const forgotPasswordUseCase=new ForgotPasswordUseCase(userRepository)
            const response=await forgotPasswordUseCase.execute({email})
            res.status(StatusCodes.OK).send(response)   
        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }
}