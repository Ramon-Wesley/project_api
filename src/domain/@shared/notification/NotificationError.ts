import { ErrorMessage } from "./ErrorMessage";

export default class NotificationError extends Error {
    private typeError:string="badRequest";
    constructor(errors:ErrorMessage[],typeError="badRequest") {
        const detailObject:object={
            [errors[0].context]: errors
            .filter((res) => res.field) 
            .map((res) => ({
                [res.field as string]: res.message,
            })),
        }

        super(JSON.stringify(detailObject));
      
      
    }

    getTypeError(): string {
        return this.typeError;
    }

 
}