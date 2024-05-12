import { Request, Response } from "express";

export default interface GenericRouterInterface<T>{
    execute(req:Request,res:Response):Promise<void>
}