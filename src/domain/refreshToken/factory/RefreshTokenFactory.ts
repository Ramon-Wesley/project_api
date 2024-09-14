import { User } from "../../users/entity/User";
import { RefreshToken } from "../entity/RefreshToken";
import { v4 as uuidv4 } from 'uuid';

export class RefreshTokenFactory{

    static createWithId(id:string,expiresIn:string,user_id:string){
        return new RefreshToken(id,expiresIn,user_id)
    }

    static create(expiresIn:string,user_id:string){
        const id= uuidv4()
        return new RefreshToken(id,expiresIn,user_id)
    }
}