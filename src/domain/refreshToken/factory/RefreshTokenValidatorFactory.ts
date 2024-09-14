import { RefreshTokenZodValidator } from "../validator/RefreshTokenZodValidator";

export class RefreshTokenValidatorFactory {
   
    static create(){
        return new RefreshTokenZodValidator()
    }
}