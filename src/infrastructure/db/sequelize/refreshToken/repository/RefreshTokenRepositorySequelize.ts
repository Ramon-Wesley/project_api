import { Op } from "sequelize"
import RepositoryFindAllResult from "../../../../../domain/@shared/repository/RepositoryFindAllResult"
import { RefreshToken } from "../../../../../domain/refreshToken/entity/RefreshToken"
import { RefreshTokenFactory } from "../../../../../domain/refreshToken/factory/RefreshTokenFactory"
import { RefreshTokenRepositoryInterface } from "../../../../../domain/refreshToken/repository/RefreshTokenRepository"
import { UserFactory } from "../../../../../domain/users/factory/UserFactory"
import { RefreshTokenModel } from "../model/RefreshTokenModel"

export default class RefreshTokenRepositorySequelize implements RefreshTokenRepositoryInterface{
    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<RefreshToken>> {
        
        try {
            let findAllRefreshTokenResult:RefreshToken[]=[];
            const result= await RefreshTokenModel.findAndCountAll({
                where:{name:{[Op.like]:`%${filter}%`}},
                order:[["name",sort]],
                limit:limit,
                offset:(page-1)*limit
              })
              const totalElements=result.count
              const totalPages = Math.ceil(totalElements / limit);
    
              result.rows.forEach((res)=>{
                const resultToken= RefreshTokenFactory.createWithId(res.id,res.expiresIn,res.user_id)

                    findAllRefreshTokenResult.push(resultToken)
                
              })
    
              const findAllResult:RepositoryFindAllResult<RefreshToken>={
                entity:findAllRefreshTokenResult,
                current_page:page,
                number_of_elements:totalElements,
                total_page:totalPages
               };
               return findAllResult
              
          } catch (error) {
            throw new Error("error listing RefreshToken record!\n"+error)
          }

    }

    async createOrUpdate(refresh:RefreshToken){
        try {
            const refresh_token=await this.findByUserId(refresh.Id)
    
            if(refresh_token){
                await refresh_token.update({
                    expiresIn:refresh.ExpiresIn
                },{where:{user_id:refresh.UserId}})
                return
            }
    
            await this.create(refresh)
            
        } catch (error) {
                
            throw new Error("error create or updating refresh token record!\n"+error)
        }
    }

    async findByUserId(id: string): Promise<RefreshTokenModel| null> {
        try {
            const result= await RefreshTokenModel.findOne({where:{user_id:id}})
            return result
            
        } catch (error) {
                
            throw new Error("error find refresh token record!\n"+error)
        }
    }


    async updateById(id: string, entity: RefreshToken): Promise<void> {
        
        try {
            const refresh_token= await this.findById(id)

            refresh_token.changeExpiresIn(entity.ExpiresIn)

            await RefreshTokenModel.update({
                expiresIn:refresh_token.ExpiresIn
            },{where:{id:id}})

            
        } catch (error) {
            
            throw new Error("error updating refresh token record!\n"+error)
        }

    }
    async deleteById(id: string): Promise<void> {
        try {
           await RefreshTokenModel.destroy({where:{id:id}}) 
        } catch (error) {
            
            throw new Error("error when deleting refresh token record!\n"+error)
        }
    }
    async create(entity: RefreshToken): Promise<void> {
        try {
            await RefreshTokenModel.create({
                id:entity.Id,
                expiresIn:entity.ExpiresIn,
                user_id:entity.UserId
            })
        } catch (error) {
            throw new Error("error creating refresh token record\n"+error)
        }
    }
    async findById(id: string): Promise<RefreshToken> {
        try {
            
            const result= await RefreshTokenModel.findOne({where:{id:id}})
            console.log(result)
            if(result ){
              const refreshToken=RefreshTokenFactory.createWithId(result.id,result.expiresIn,result.user_id)
                return refreshToken 
            }
            throw new Error("refresh token not found!!")    
        } catch (error) {
            throw new Error(`Error in findById: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }


}                       