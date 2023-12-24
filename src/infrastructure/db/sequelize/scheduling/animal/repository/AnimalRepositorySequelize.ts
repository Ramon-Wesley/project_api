import { Op, where } from "sequelize";
import RepositoryFindAllResult from "../../../../../../domain/@shared/repository/RepositoryFindAllResult";
import Animal from "../../../../../../domain/scheduling/animal/entity/Animal";
import AnimalRepositoryInterface from "../../../../../../domain/scheduling/animal/repository/AnimalrepositoryInterface";
import AnimalModel from "../model/AnimalModel";

export default class AnimalRepositorySequelize implements AnimalRepositoryInterface{
   async create(entity: Animal): Promise<void> {

        try {
            await AnimalModel.create({
                id:entity.Id,
                name:entity.Name,
                customer_id:entity.Customer_id,
                race_id:entity.Race_id,
                weight:entity.Weight,
                date_of_birth:entity.Date_of_birth
            })
        } catch (error) {
            throw new Error("error creating animal record\n"+error)
        }
    }
    async findById(id: string): Promise<Animal> {
        try {
           const animal=await AnimalModel.findByPk(id);
           if(animal){
               return new Animal(animal.id,animal.customer_id,animal.name,animal.race_id,animal.weight,animal.date_of_birth)
           }
           throw new Error("Animal not found!")
        } catch (error) {
            throw new Error("error when fetching animal record!\n"+error)
        }
    }
    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<Animal>> {
       try {
            let entity:Animal[]=[]

            const animal=await AnimalModel.findAndCountAll({
            where:{name:{[Op.like]:`%${filter}%`}},
            order:[["name",sort]],
            limit:limit,
            offset:(page-1)*limit,
          })
          animal.rows.forEach((res)=>{
            const result=new Animal(res.id,res.customer_id,res.name,res.race_id,res.weight,res.date_of_birth)
            entity.push(result)
          })
          const totalElements=animal.count
          const totalPages = Math.ceil(totalElements / limit);
          const findAllResult:RepositoryFindAllResult<Animal>={
            entity:entity,
            current_page:page,
            number_of_elements:totalElements,
            total_page:totalPages
          }
          return findAllResult
       } catch (error) {
        throw new Error("error listing animal record!\n"+error)
       }
    }
   async updateById(id: string, entity: Animal): Promise<void> {
        try {
            const animal=await AnimalModel.findByPk(id);
            if(animal){
                await animal.update({
                    name:entity.Name,
                    customer_id:entity.Customer_id,
                    race_id:entity.Race_id,
                    weight:entity.Weight,
                    date_of_birth:entity.Date_of_birth
                })
                return
            }
            throw new Error("Animal not found!")
         } catch (error) {
             throw new Error("error when update animal record!\n"+error)
         }

    }
    async deleteById(id: string): Promise<void> {
        try {
          await AnimalModel.destroy({where:{id:id}}) 
        } catch (error) {
            throw new Error("error when deleting animal record!\n"+error)
        }
    }

}