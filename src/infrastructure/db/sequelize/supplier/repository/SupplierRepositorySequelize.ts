import { Op } from "sequelize";
import Address from "../../../../../domain/@shared/object-value/address/Address";
import RepositoryFindAllResult from "../../../../../domain/@shared/repository/RepositoryFindAllResult";
import Supplier from "../../../../../domain/supplier/entity/Supplier";
import SupplierRepositoryInterface from "../../../../../domain/supplier/repository/SupplierRepositoryInterface";
import AddressModel from "../../address/model/AddressModel";
import SupplierModel from "../model/SupplierModel";

export default class SupplierRepositorySequelize implements SupplierRepositoryInterface{

   
   async create(entity: Supplier): Promise<void> {
  try {
    await  SupplierModel.create({
      id:entity.Id,
      name:entity.Name,
      cnpj:entity.Cnpj,
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
    throw new Error("error creating supplier record\n"+error)
  }
  
    
    }


   async findById(id: string): Promise<Supplier> {
    try {
      const result=await SupplierModel.findOne({where:{id:id}, include: [{ model: AddressModel}]})
        if(result){
            const supplier=new Supplier(result.id,result.name,result.cnpj,result.email,result.date_of_birth)
            const address=new Address(result.address.uf,result.address.city,result.address.neighborhood,
            result.address.zipCode,result.address.street,result.address.number,result.address.description)
            supplier.changeAddress(address)
            return supplier
        }
        throw new Error("Supplier not found!")
    } catch (error) {
      throw new Error("error when fetching supplier record!\n"+error)
    }
        
    }

    async updateById(id: string, entity: Supplier): Promise<void> {
      try {
        const supplier=await SupplierModel.findByPk(id,{include: [AddressModel]})
        if(supplier){
          if(entity.Address){
            await supplier.address.update(entity.Address);
          }
          await supplier.update(entity,{where:{id:id}})
          return
        }
        throw new Error('Supplier not found!');
      } catch (error) {
        throw new Error('Error updating supplier record!\n' + error);
      }
    }

    async findAll(sort: "desc" | "asc", filter: string, limit: number, page: number): Promise<RepositoryFindAllResult<Supplier>> {
      try {
        let findAllSupplierResult:Supplier[]=[];
        const result= await SupplierModel.findAndCountAll({
            where:{name:{[Op.like]:`%${filter}%`}},
            order:[["name",sort]],
            limit:limit,
            offset:(page-1)*limit,
            include: [{ model: AddressModel}]
          })
          const totalElements=result.count
          const totalPages = Math.ceil(totalElements / limit);
          result.rows.forEach((res)=>{
            let supplier=new Supplier(res.id,res.name,res.cnpj,res.email,res.date_of_birth)
           let address=new Address(res.address.uf,res.address.city,res.address.neighborhood,res.address.zipCode,res.address.street,res.address.number,res.address.description)
            supplier.changeAddress(address)
            findAllSupplierResult.push(supplier)
          })

          const findAllResult:RepositoryFindAllResult<Supplier>={
            entity:findAllSupplierResult,
            current_page:page,
            number_of_elements:totalElements,
            total_page:totalPages
           };
           return findAllResult
          
      } catch (error) {
        throw new Error("error listing supplier record!\n"+error)
      }
    


    }

    async deleteById(id: string): Promise<void> {
    
      try {
        await SupplierModel.destroy({where:{id:id}})
      } catch (error) {
        throw new Error("error when deleting supplier record!\n"+error)
        
      }
    }

}