import { TokenFactory } from "../../../../../infrastructure/providers/tokens/factory/TokenFactory";
import { RefreshToken } from "../RefreshToken";


export class RefreshTokenFactory{


    static create(expiresIn:Date):RefreshToken{
        const token=TokenFactory.create().generatedToken(expiresIn.toISOString(),process.env.JWT_SECRET as string)
        return new RefreshToken(token,expiresIn)
    }
}