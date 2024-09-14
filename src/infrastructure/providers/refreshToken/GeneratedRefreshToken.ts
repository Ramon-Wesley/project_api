import { tryCatch } from "bullmq"
import { RefreshTokenFactory } from "../../../domain/refreshToken/factory/RefreshTokenFactory"
import DbFactoryRepositories from "../../db/factory/DbFactoryRepositories"

export class GeneratedRefreshToken{

    async execute(id:string){
        try {
            const expires=process.env.JWT_EXPIRES as string
            const refreshToken=RefreshTokenFactory.create(expires,id)
            DbFactoryRepositories.refreshTokenRepository().createOrUpdate(refreshToken)
            return refreshToken
            
        } catch (error) {
            if (typeof error === 'string') {
                throw new Error(error);
            } else {
                throw new Error('Unknown error occurred');
            }
        }
    }
}