import { Op } from "sequelize";
import Address from "../../../../../domain/@shared/object-value/address/Address";
import RepositoryFindAllResult from "../../../../../domain/@shared/repository/RepositoryFindAllResult";
import Employee from "../../../../../domain/employee/entity/Employee";

import AddressModel from "../../address/model/AddressModel";
import EmployeeModel from "../model/EmployeeModel";
import { EmployeeRepositoryInterface } from "../../../../../domain/employee/repository/Employee.repository.interface";

export default class EmployeeRepositorySequelize implements EmployeeRepositoryInterface{

   
   async create(entity: Employee): Promise<void> {
 try {
  
   await  EmployeeModel.create({
     id:entity.Id,
     name:entity.Name,
     ra:entity.Ra,
     email:entity.Email,
     date_of_birth:entity.Date_of_birth,
     isActive:true,
     address:{
       uf:entity.Address?.Uf,
       city:entity.Address?.City,
       neighborhood:entity.Address?.Neighborhood,
       zipCode:entity.Address?.ZipCode,
       street:entity.Address?.Street,
       number:entity.Address?.Number,
       description:entity.Address?.Description,
       entity_id: entity.Id,
     }
 }, {
   include: [AddressModel]
 })   
 } catch (error) {
  throw new Error("error creating employee record\n"+error)
 }
    }


   async findById(id: string): Promise<Employee> {
   try {
     const result=await EmployeeModel.findOne({where:{id:id}, include: [{ model: AddressModel}]})
       if(result){
           const employee=new Employee(result.id,result.name,result.ra,result.email,result.date_of_birth)
           const address=new Address(result.address.uf,result.address.city,result.address.neighborhood,
           result.address.zipCode,result.address.street,result.address.number,result.address.description)
           employee.changeAddress(address)
           return employee
       }
       throw new Error("Employee not found!")
    
   } catch (error) {
    throw new Error("error when fetching employee record!\n"+error)
   }
    } 
        
    

    async updateById(id: string, entity: Employee): Promise<void> {
      try {
        const employee=await EmployeeModel.findByPk(id,{include: [AddressModel]})
        if(employee){
          if(entity.Address){
            await employee.address.update(entity.Address);
          }
          await employee.update(entity,{where:{id:id}})
          return
        }
        throw new Error('employee not found!');
      } catch (error) {
        throw new Error('Error updating employee record!\n' + error);
      }
        }
    

    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<Employee>> {
     
      try {
        
        let findAllEmployeeResult:Employee[]=[];
        const result= await EmployeeModel.findAndCountAll({
            where:{name:{[Op.like]:`%${filter}%`}},
            order:[["name",sort]],
            limit:limit,
            offset:(page-1)*limit,
            include: [{ model: AddressModel}]
          })
          const totalElements=result.count
          const totalPages = Math.ceil(totalElements / limit);
          result.rows.forEach((res)=>{
            let employee=new Employee(res.id,res.name,res.ra,res.email,res.date_of_birth)
           let address=new Address(res.address.uf,res.address.city,res.address.neighborhood,res.address.zipCode,res.address.street,res.address.number,res.address.description)
            employee.changeAddress(address)
            findAllEmployeeResult.push(employee)
          })

          const findAllResult:RepositoryFindAllResult<Employee>={
            entity:findAllEmployeeResult,
            current_page:page,
            number_of_elements:totalElements,
            total_page:totalPages
           };
           return findAllResult
          
          } catch (error) {
            throw new Error("error when fetching all employee record!\n"+error)
          }
    }

    async deleteById(id: string): Promise<void> {
      try {
        await EmployeeModel.destroy({where:{id:id}})
      } catch (error) {
        throw new Error("error when deleting employee record!\n"+error)
      }
    }


    async findByEmail(email:string): Promise<Employee> {

      try {
        const result= await EmployeeModel.findOne({where:{email:email},include:[AddressModel]})
       
        if(result){
          const employee=new Employee(result.id,result.name,result.ra,result.email,result.date_of_birth)
          const address=new Address(result.address.uf,result.address.city,result.address.neighborhood,
          result.address.zipCode,result.address.street,result.address.number,result.address.description)
          employee.changeAddress(address)
          return employee
      }
      throw new Error("employee not found!!")
  } catch (error) {
    throw new Error("error when fetching employee with email record!\n"+error)
  }
    
  }
}