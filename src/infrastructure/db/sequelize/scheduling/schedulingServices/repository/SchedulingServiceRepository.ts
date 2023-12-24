import { Op } from "sequelize";
import RepositoryFindAllResult from "../../../../../../domain/@shared/repository/RepositoryFindAllResult";
import SchedulingServices from "../../../../../../domain/scheduling/schedulingServices/entity/SchedulingServices";
import SchedulingServiceRepositoryInterface from "../../../../../../domain/scheduling/schedulingServices/repository/SchedulingServices.repository";
import SchedulingServicesModel from "../model/SchedulingServicesModel";

export default class SchedulingServiceRepository implements SchedulingServiceRepositoryInterface{
    async create(entity: SchedulingServices): Promise<void> {
        try {
          await SchedulingServicesModel.create({
            id:entity.Id,
            name:entity.Name,
            price:entity.Price
          })  
        } catch (error) {
            throw new Error("error creating scheduling service record\n"+error)
        }
    }
    
   async findById(id: string): Promise<SchedulingServices> {
        try {
            const result= await SchedulingServicesModel.findByPk(id);
            if(result){
                return new SchedulingServices(result.id,result.name,result.price)
            }
            throw new Error("scheduling service not found!")
        } catch (error) {
            throw new Error("error when fetching scheduling service record!\n"+error)
        }
    }
    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<SchedulingServices>> {
        try {
            const schedulingServices:SchedulingServices[]=[]
            const result=await SchedulingServicesModel.findAndCountAll({
                where:{name:{[Op.like]:`%${filter}%`}},
                order:[["name",sort]],
                limit:limit,
                offset:(page-1)*limit
              })
              const totalElements=result.count
              const totalPages = Math.ceil(totalElements / limit);
              result.rows.forEach((res)=>{
                const service=new SchedulingServices(res.id,res.name,res.price)
                schedulingServices.push(service)
              })
              const findResult:RepositoryFindAllResult<SchedulingServices>={
                entity:schedulingServices,
                number_of_elements:totalElements,
                total_page:totalPages,
                current_page:page
              }

              return findResult
        } catch (error) {
            throw new Error("error when fetching all scheduling service record!\n"+error)
        }
    }
    async updateById(id: string, entity: SchedulingServices): Promise<void> {
       try {
        await SchedulingServicesModel.update(entity,{where:{id:id}})
       } catch (error) {
        throw new Error('Error updating employee record!\n' + error);
       }
    }
    async deleteById(id: string): Promise<void> {
        try {
            await SchedulingServicesModel.destroy({where:{id:id}})
        } catch (error) {
            throw new Error("error when deleting scheduling service record!\n"+error)
        }
    }

}