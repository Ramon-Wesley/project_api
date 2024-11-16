import { Response,Request } from "express";
import CreateUserInDto from "../../../../../use-case/user/create/CreateUserInDto";
import DbFactoryRepositories from "../../../../db/factory/DbFactoryRepositories";
import CreateUserUseCase from "../../../../../use-case/user/create/CreateUserUseCase";
import { StatusCodes } from "http-status-codes";
import NotificationError from "../../../../../domain/@shared/notification/NotificationError";
import { ErrorResponseMessage } from "../../@shared/ErrorResponseMessage";


export class UserRouterCreate{

    async execute(req:Request<{},{},CreateUserInDto>,res:Response){
        try {
            const userRepository=DbFactoryRepositories.userRepository();
            const usecase= new CreateUserUseCase(userRepository);
            const request=req.body
            //const mensagem=new MessageEmail("app-mail","ramonwj.s@outlook.com","Recuperar Senha","Recuperar Senha","Recuperar Senha")
            //EmaulFactory.create().send(mensagem)
            await usecase.execute(request)
            res.status(StatusCodes.CREATED).send()

        } catch (error) {
            const response=ErrorResponseMessage.execute(error as Error)

            res.status(response.status).send(response)
        }
    }

}