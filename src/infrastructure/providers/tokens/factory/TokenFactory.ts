import { TokenInterface } from "../@shared/TokenInterface";
import { JsonWebToken } from "../jsonwebToken/JsonWebToken";

export class TokenFactory{
 
    static create():TokenInterface{
        switch (process.env.TOKEN) {
            case "jsonwebtoken":
                return new JsonWebToken();
            default:
                return new JsonWebToken();
        }
    }
    
}