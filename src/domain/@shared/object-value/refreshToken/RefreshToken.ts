import NotificationError from "../../notification/NotificationError";
import ObjectValue from "../ObjectValue";
import { RefreshTokenValidatorFactory } from "./factory/RefreshTokenValidatorFactory";

export class RefreshToken extends ObjectValue{
    constructor(
        private token: string,
        private expiresIn: Date
    ){ super(); this.validate() }

    validate(){

        RefreshTokenValidatorFactory.create().validate(this)

        if(this.notification.hasErrors()){
   
            throw new NotificationError(this.notification.getErrors())
        }   
    }

    get ExpiresIn(){
        return this.expiresIn
    }
    get Token(){
        return this.token
    }
  

}
