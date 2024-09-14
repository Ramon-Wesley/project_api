import { Response,Request } from "express";
import CreateUserInDto from "../../../../../use-case/user/create/CreateUserInDto";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import CreateUserUseCase from "../../../../../use-case/user/create/CreateUserUseCase";
import { StatusCodes } from "http-status-codes";
import NotificationError from "../../../../../domain/@shared/notification/NotificationError";

export class UserRouterCreate{

    async execute(req:Request<{},{},CreateUserInDto>,res:Response){
        try {
            const userRepository=DbFactoryRepositories.userRepository();
            const usecase= new CreateUserUseCase(userRepository);
            const request=req.body
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()

        } catch (error) {
            const err=error as Error;
            const status=err instanceof NotificationError ? StatusCodes.BAD_REQUEST: StatusCodes.INTERNAL_SERVER_ERROR
            res.status(status).send(err+"batata")
        }
    }

}