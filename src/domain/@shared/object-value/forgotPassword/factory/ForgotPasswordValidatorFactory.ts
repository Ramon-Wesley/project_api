import { ForgotPassword } from "../ForgotPassword";

export class ForgotPasswordValidatorFactory {
    static create(token:string,expiresIn:Date,numberEmailIdentification:string){
        return new ForgotPassword(token,expiresIn,numberEmailIdentification)
    }
}