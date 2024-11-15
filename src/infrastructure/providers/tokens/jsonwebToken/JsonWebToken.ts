import { TokenInterface } from "../@shared/TokenInterface";
import {sign,verify} from "jsonwebtoken"
import {config} from "dotenv"

export class JsonWebToken implements TokenInterface{

     generatedToken(expiresIn:string,subject:string): string {

        const token=sign({},process.env.JWT_SECRET as string,{
            subject,
            expiresIn:expiresIn
        })
        return token
    }

    verifyToken(token:string){

        try {
            return verify(token,process.env.JWT_SECRET as string)
        } catch (error) {
            return new Error("invalid token")
        }
    }

}