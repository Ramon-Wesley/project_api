import { RefreshTokenFactory } from "../../domain/@shared/object-value/refreshToken/factory/RefreshTokenFactory";
import { RefreshToken } from "../../domain/@shared/object-value/refreshToken/RefreshToken";
import { UserRepositoryInterface } from "../../domain/users/repository/UserRepository";
import { TokenFactory } from "../../infrastructure/providers/tokens/factory/TokenFactory";
import useCaseInterface from "../@shared/UseCaseInterface";
import { RefreshTokenInDto } from "./RefreshTokenInDto";
import { RefreshTokenOutDto } from "./RefreshTokenOutDTO";


export class RefreshTokenUseCase implements useCaseInterface<RefreshTokenInDto,RefreshTokenOutDto>{

    private refresh_token:UserRepositoryInterface
    ;
    constructor(refresh_token:UserRepositoryInterface){
        this.refresh_token=refresh_token;
    }
    async execute(input: RefreshTokenInDto): Promise<RefreshTokenOutDto> {
        try {
            const verifyToken=TokenFactory.create().verifyToken(input.refreshToken)
            console.log(verifyToken)
            const refreshToken= await this.refresh_token.findByEmail("iqi")
            const tokenResult=refreshToken.RefreshToken
            if(!tokenResult){
                throw new Error("Refresh token not exists!")
            }
            //logica de refresh token expires
           // ###

           
            const expires=new Date(process.env.JWT_EXPIRES as string)
            const token = RefreshTokenFactory.create(expires)
            refreshToken.insertRefreshToken(token)
            await this.refresh_token.updateById(refreshToken.Id,refreshToken)

            const response:RefreshTokenOutDto= {
                token:token 
            }

            return response
        } catch (error) {
            throw new Error("Error creating refresh token!"+error)
        }
    }


}