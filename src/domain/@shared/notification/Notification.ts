import { ErrorMessage } from "./ErrorMessage";

export default class Notification{
    private notification:ErrorMessage[]=[];

    hasErrors():boolean{
        return this.notification.length > 0
    }

    insertErrors(notification:ErrorMessage){
        this.notification.push(notification)
    }
    getErrors():ErrorMessage[]{
        return this.notification
    }

    message(context?:string):string{
        let errors="";
        this.notification.forEach((res)=>{
            if(context === undefined || context === res.context){
                errors+=`${res.context}: ${res.message},`
            }
        })
        return errors;
    }
}