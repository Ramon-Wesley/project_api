import { RefreshTokenRepositoryInterface } from "../../domain/refreshToken/repository/RefreshTokenRepository";
import DbFactoryRepositories from "../../infrastructure/db/factory/DbFactoryRepositories";
import { TokenFactory } from "../../infrastructure/providers/tokens/factory/TokenFactory";
import useCaseInterface from "../@shared/UseCaseInterface";
import { RefreshTokenInDto } from "./RefreshTokenInDto";
import { RefreshTokenOutDto } from "./RefreshTokenOutDTO";


export class RefreshTokenUseCase implements useCaseInterface<RefreshTokenInDto,RefreshTokenOutDto>{

    private refresh_token:RefreshTokenRepositoryInterface;
    constructor(refresh_token:RefreshTokenRepositoryInterface){
        this.refresh_token=refresh_token;
    }
    async execute(input: RefreshTokenInDto): Promise<RefreshTokenOutDto> {
        try {
            const refreshToken= await this.refresh_token.findById(input.refreshToken)

            if(!refreshToken){
                throw new Error("Refresh token not exists!")
            }
            //logica de refresh token expires
           // ###

           
            const expires=process.env.JWT_EXPIRES as string
            const token = TokenFactory.create().generatedToken(expires,refreshToken.UserId)
            const response:RefreshTokenOutDto= {
                token:token
            }

            return response
        } catch (error) {
            throw new Error("Error creating refresh token!"+error)
        }
    }


}