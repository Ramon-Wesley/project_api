import { StatusCodes } from "http-status-codes";
import NotificationError from "../../../../domain/@shared/notification/NotificationError";
import ErrorResponseInterface from "./ErrorResponseInterface";
import e from "express";

export class  ErrorResponseMessage {

 

    static execute(error:Error):ErrorResponseInterface{
       
        const status=error instanceof NotificationError ? StatusCodes.BAD_REQUEST: StatusCodes.INTERNAL_SERVER_ERROR
        let response:ErrorResponseInterface | null= null;
        if(error instanceof NotificationError){
            
            response={
                type:error.name,
                title:error.getTypeError(),
                status:status,
                detail:JSON.parse(error.message)
            }
        }else{
        response={
            type:error.name,
            title:error.message,
            status:status,
            detail:error.message
        }
    }
        return response
    }
}