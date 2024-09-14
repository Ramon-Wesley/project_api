import { Request,Response } from "express";
import { SignInDto } from "../../../../../use-case/user/signIn/SignInDto";
import { StatusCodes } from "http-status-codes";
import { SignInUseCase } from "../../../../../use-case/user/signIn/SignInUseCase";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";

import { RefreshTokenUseCase } from "../../../../../use-case/refreshToken/RefreshTokenCreateCase";
import { RefreshTokenInDto } from "../../../../../use-case/refreshToken/RefreshTokenInDto";
import { STATUS_CODES } from "http";


export class RefreshTokenUserRouter{

    async execute(req:Request<{},{},RefreshTokenInDto>, res:Response ){
    const refreshToken=req.body

    const useCase=new RefreshTokenUseCase(DbFactoryRepositories.refreshTokenRepository())

    const token = await useCase.execute(refreshToken)
  
    return res.status(StatusCodes.OK).json(token)
    }
    
}