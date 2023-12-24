import { Op, Transaction, where } from 'sequelize';
import { Model, Sequelize } from "sequelize-typescript";
import AppointmentBookingRepositoryInterface from "../../../../../../domain/scheduling/appointment-booking/repository/AppointmentBookingInterface.repository";
import RepositoryFindAllResult from "../../../../../../domain/@shared/repository/RepositoryFindAllResult";
import AppointmentBooking from "../../../../../../domain/scheduling/appointment-booking/entity/AppointmentBooking";
import AppointmentBookingModel from "../model/AppointmentBookingModel";
import SchedulingServicesModel from '../../schedulingServices/model/SchedulingServicesModel';
import SchedulingServices from '../../../../../../domain/scheduling/schedulingServices/entity/SchedulingServices';
import CustomerModel from '../../../customer/model/CustomerModel';

export default class AppointmentBookingRepository implements AppointmentBookingRepositoryInterface{

    private sequelize:Sequelize;
    constructor(sequelize:Sequelize){
        this.sequelize=sequelize;
    }

    async create(entity: AppointmentBooking): Promise<void> {
        try {
            const schedulingServicesIds=entity.SchedulingServices.map(object=>object.Id)
            await AppointmentBookingModel.create({
                id:entity.Id,
                customer_id:entity.Customer_id,
                employee_id:entity.Employee_id,
                animal_id:entity.Animal_id,
                date:entity.Date,
                total:entity.Total
            }).then(async(res)=>{return await res.$add('schedulingServices', schedulingServicesIds);})

        } catch (error) {
            throw new Error("error creating appointmentBooking record\n"+error)
        }
    }
    async findById(id: string): Promise<AppointmentBooking> {
        try {
            const appointment=await AppointmentBookingModel.findByPk(id,{include:[SchedulingServicesModel]});
            if(appointment){
                let schedulingService:SchedulingServices[]=[];
                appointment.schedulingServices.forEach((res)=>{
                    const result=new SchedulingServices(res.id,res.name,res.price)
                    schedulingService.push(result)
                })
                return new AppointmentBooking(appointment.id,appointment.customer_id,appointment.employee_id,appointment.animal_id,appointment.date,schedulingService)

            }
            throw new Error("appointmentBooking not found!")
        } catch (error) {
            throw new Error("error when fetching appointmentBooking record!\n"+error)
            
        }
    }
    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<AppointmentBooking>> {
       try {
        const appointment:AppointmentBooking[]=[]
        const result= await AppointmentBookingModel.findAndCountAll({
            where: {
                '$customer.name$': {
                    [Op.like]: `%${filter}%`,
                },
              },
            order:[["date",sort]],
            limit:limit,
            offset:(page-1)*limit,
            include: [
                {
                  model: CustomerModel,
                  as: 'customer', 
                  attributes: ['name'], 
                },
                {
                    model:SchedulingServicesModel
                }
              ],
          })
          
          const totalElements=result.count
          const totalPages = Math.ceil(totalElements / limit);
          
          result.rows.forEach((res)=>{
            let scheduling:SchedulingServices[]=[]
            res.schedulingServices.forEach((obj)=>{
                const schedulingResult=new SchedulingServices(obj.id,obj.name,obj.price)
                scheduling.push(schedulingResult)
            })
            const appointmentResult=new AppointmentBooking(res.id,res.customer_id,res.employee_id,res.animal_id,res.date,scheduling)
            appointment.push(appointmentResult)
          })

          const findAllResult:RepositoryFindAllResult<AppointmentBooking>={
            entity:appointment,
            current_page:page,
            number_of_elements:totalElements,
            total_page:totalPages
          }
          return findAllResult
          } catch (error) {
        throw new Error("Error fetching all AppointmentBooking record\n"+error)
       }
    }

   async updateById(id: string, entity: AppointmentBooking): Promise<void> {
       const transaction: Transaction = await this.sequelize.transaction();
        try {
            const schedulingServicesIds=entity.SchedulingServices.map((res)=>res.Id) 
          const appointment= await AppointmentBookingModel.findByPk(id,{include:[SchedulingServicesModel]})
          
          if(appointment){
               const schedulingServicesIdsRemove=appointment?.schedulingServices.filter((res)=>!schedulingServicesIds.includes(res.id)).map((res)=>res.id)
               await appointment.update({
                    customer_id:entity.Customer_id,
                    employee_id:entity.Employee_id,
                    animal_id:entity.Animal_id,
                    date:entity.Date,
                    total:entity.Total
                },{where:{id:id},transaction})

                if (schedulingServicesIdsRemove.length > 0) {
                    await appointment.$remove("schedulingServices", schedulingServicesIdsRemove, { transaction });
                  }
            
                  if (schedulingServicesIds.length > 0) {
                    await appointment.$add("schedulingServices", schedulingServicesIds, { transaction });
                  }
            
                 await transaction.commit()
                
            }
        
        } catch (error) {
            await transaction.rollback()
            throw new Error('Error updating appointmentBooking record!\n' + error);  
        }
    }
 async deleteById(id: string): Promise<void> {
        try {
            await AppointmentBookingModel.destroy({where:{id:id}})
        } catch (error) {
            throw new Error("error when deleting AppointmentBooking record!\n"+error)
        }
    }
    
}