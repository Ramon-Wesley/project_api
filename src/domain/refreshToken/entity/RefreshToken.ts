import Entity from "../../@shared/entity/Entity";
import NotificationError from "../../@shared/notification/NotificationError";
import { User } from "../../users/entity/User";
import { RefreshTokenValidatorFactory } from "../factory/RefreshTokenValidatorFactory";

export class RefreshToken extends Entity{
    constructor(
        id: string,
        private expiresIn: string,
        private userId: string
    ){ super(id); this.validate() }

    validate(){

        RefreshTokenValidatorFactory.create().validate(this)

        if(this.notification.hasErrors()){
   
            throw new NotificationError(this.notification.getErrors())
        }   
    }

    changeExpiresIn(expiresIn:string){
        this.expiresIn=expiresIn
        this.validate()
    }
    get Id(){
        return this.id
    }

    get ExpiresIn(){
        return this.expiresIn
    }
    get UserId(){
        return this.userId
    }

}
