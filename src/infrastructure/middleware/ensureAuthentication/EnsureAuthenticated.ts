import { NextFunction } from "express"
import { Request,Response } from "express"
import { StatusCodes } from "http-status-codes"
import { TokenFactory } from "../../providers/tokens/factory/TokenFactory"
import { Is } from "sequelize-typescript"

export default class EnsureAuthenticated{
    static execute(req:Request,res:Response,next:NextFunction){
        const authtoken=req.headers.authorization
        if(!authtoken){
            res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized")
        }else{
            const [,token]=authtoken.split(" ")
            const isValid=TokenFactory.create().verifyToken(token)
            if(isValid){
                next()
            }else{
                res.status(StatusCodes.UNAUTHORIZED).send(isValid)
            }
        }
    }
}