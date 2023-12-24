import { Op } from "sequelize";
import RepositoryFindAllResult from "../../../../../../domain/@shared/repository/RepositoryFindAllResult";
import Race from "../../../../../../domain/scheduling/animal/entity/Race";
import RaceRepositoryInterface from "../../../../../../domain/scheduling/animal/repository/RaceRepositoryInterface";
import RaceModel from "../model/RaceModel";

export default class RaceRepositorySequelize implements RaceRepositoryInterface{
    async create(entity: Race): Promise<void> {
        try {
            await RaceModel.create({
                id:entity.Id,
                name:entity.Name
            })
        } catch (error) {
            throw new Error("error creating Race record\n"+error)
        }
    }
    async findById(id: string): Promise<Race> {
        try {
           const race=await RaceModel.findByPk(id);
           if(race){
               return new Race(race.id,race.name)
           }
           throw new Error("Race not found!")
        } catch (error) {
            throw new Error("error when fetching race record!\n"+error)
        }
    }
    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<Race>> {
       try {
            let entity:Race[]=[]

            const race=await RaceModel.findAndCountAll({
            where:{name:{[Op.like]:`%${filter}%`}},
            order:[["name",sort]],
            limit:limit,
            offset:(page-1)*limit,
          })
          race.rows.forEach((res)=>{
            const result=new Race(res.id,res.name)
            entity.push(result)
          })
          const totalElements=race.count
          const totalPages = Math.ceil(totalElements / limit);
          const findAllResult:RepositoryFindAllResult<Race>={
            entity:entity,
            current_page:page,
            number_of_elements:totalElements,
            total_page:totalPages
          }
          return findAllResult
       } catch (error) {
        throw new Error("error listing race record!\n"+error)
       }
    }
   async updateById(id: string, entity: Race): Promise<void> {
        try {
            const race=await RaceModel.findByPk(id);
            if(race){
                race.update({
                    id:id,
                    name:entity.Name,
                })
            }
            throw new Error("Race not found!")
         } catch (error) {
             throw new Error("error when update race record!\n"+error)
         }

    }
    async deleteById(id: string): Promise<void> {
        try {
          await RaceModel.destroy({where:{id:id}}) 
        } catch (error) {
            throw new Error("error when deleting race record!\n"+error)
        }
    }

}