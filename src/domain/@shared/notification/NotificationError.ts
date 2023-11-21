import { ErrorMessage } from "./ErrorMessage";

export default class NotificationError extends Error{

    constructor(errors:ErrorMessage[]){
        super(errors.map((res)=>`${res.context}: ${res.message}`).join(","))
    }
}