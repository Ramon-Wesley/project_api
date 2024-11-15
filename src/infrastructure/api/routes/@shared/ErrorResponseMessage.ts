import { StatusCodes } from "http-status-codes";
import NotificationError from "../../../../domain/@shared/notification/NotificationError";
import ErrorResponseInterface from "./ErrorResponseInterface";

export class ErrorResponseMessage {

    static execute(error:Error):ErrorResponseInterface{
        const err=error as Error;
        const status=err instanceof NotificationError ? StatusCodes.BAD_REQUEST: StatusCodes.INTERNAL_SERVER_ERROR
        let response:ErrorResponseInterface | null= null;
        if(err instanceof NotificationError){
            response={
                type:err.name,
                title:err.getTypeError(),
                status:status,
                detail:err.message
            }
        }else{
        response={
            type:err.name,
            title:err.message,
            status:status,
            detail:err.message
        }
    }
        return response
    }
}