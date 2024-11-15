import { ErrorMessage } from "./ErrorMessage";

export default class NotificationError extends Error {
    private typeError:string="badRequest";
    constructor(errors:ErrorMessage[],typeError="badRequest") {
        super( `"${errors[0].context}": [${errors.map((res) => ` {"${res.field}": "${res.message}"}`).join(",")}]`);
    }

    getTypeError(): string {
        return this.typeError;
    }
}