import DatabaseError from "../../../../../domain/@shared/Errors/DatabaseError";
import RepositoryFindAllResult from "../../../../../domain/@shared/repository/RepositoryFindAllResult";
import { User } from "../../../../../domain/users/entity/User";
import { UserFactory } from "../../../../../domain/users/factory/UserFactory";
import { UserRepositoryInterface } from "../../../../../domain/users/repository/UserRepository";
import UserModel from "../model/UserModel";



export default class UserRepositorySequelize implements UserRepositoryInterface{
    async create(entity: User): Promise<void> {
       try {
        await UserModel.create({
            id:entity.Id,
            name:entity.Name,
            email:entity.Email,
            password:entity.Password,
            isActive:entity.IsActive,
            roles:entity.Roles as string
        })
       } catch (error) {
        throw new DatabaseError("error when creating user record!\n")
       }
    }
    async findById(id: string): Promise<User> {
        try {
            const result= await UserModel.findOne({where:{id:id}})
            if(result){
                const user=UserFactory.createWithId(result.id,result.name,result.email,result.password,result.isActive,result.roles)
                return user 
            }
            throw new DatabaseError("user not found!")
        } catch (error) {
            throw new DatabaseError("user not found!")
        }
    }
   async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<User>> {
       try {
        const result= await UserModel.findAll({
            limit:limit,
            offset:limit*page,
            order:[["name",sort]],
            where:filter ? {name:filter} : undefined})
            const users=result.map((user)=>UserFactory.createWithId(user.id,user.name,user.email,user.password,user.isActive,user.roles))
            const userResult:RepositoryFindAllResult<User>={
                entity:users,
                number_of_elements:result.length,
                current_page:page,
                total_page:1
            }
            
            return userResult
       } catch (error) {
        throw new DatabaseError("error when fetching user record!\n")
        
       }
    }
   async updateById(id: string, entity: User): Promise<void> {
        try {
            const user=await UserModel.findByPk(id)
            if(user){
                user.name=entity.Name
                user.email=entity.Email
                user.password=entity.Password
                user.isActive=entity.IsActive
                user.roles=entity.Roles as string
                await UserModel.update(user,{where:{id:id}})
                return
            }
            throw new DatabaseError("user not found!")
        } catch (error) {
            
            throw new DatabaseError("error when updating user record!\n")
        }
    }
    async deleteById(id: string): Promise<void> {
        try {
            await UserModel.destroy({where:{id:id}})
        } catch (error) {
            throw new DatabaseError("error when deleting user record!\n")
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            const result= await UserModel.findOne({where:{email:email}})
            if(result){
                const user=UserFactory.createWithId(result.id,result.name,result.email,result.password,result.isActive,result.roles)
                return user
            }
            throw new DatabaseError("user not found!")
        } catch (error) {
            throw new DatabaseError("user not found!")
        }
    }
}