import { EncryptFactory } from "../../../infrastructure/providers/encripty/factory/EncryptFactory";
import { RefreshToken } from "../../@shared/object-value/refreshToken/RefreshToken";
import { Roles } from "../@shared/Roles";
import { User } from "../entity/User"
import {v4 as uuidv4} from "uuid";

export class UserFactory{

    static create( 
        name:string,
        email:string,
        password:string,

        ):User
        {
            const uuid=uuidv4()
            const user =new User(uuid,name,email,password)
            return user
        }
        
        static createWithId( 
            id:string,
            name:string,
            email:string,
            password:string,
            isActive:boolean,
            roles:Roles
    
            ):User
            {
          
                const user=new User(id,name,email,password)
                user.changeIsActive(isActive)
                user.changeRole(roles)
                return user
            }

            static createWithRefreshToken( 
                id:string,
                name:string,
                email:string,
                password:string,
                refreshToken:RefreshToken
                ):User
                {
                    const user =new User(id,name,email,password)
                        user.insertRefreshToken(refreshToken)
                        return user
                        
                  
                }
}