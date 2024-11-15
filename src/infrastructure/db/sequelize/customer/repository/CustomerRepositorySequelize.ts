import { Op } from "sequelize";
import Address from "../../../../../domain/@shared/object-value/address/Address";
import RepositoryFindAllResult from "../../../../../domain/@shared/repository/RepositoryFindAllResult";
import Customer from "../../../../../domain/customer/entity/Customer";
import CustomerRepositoryInterface from "../../../../../domain/customer/repository/CustomerRepositoryInterface";
import AddressModel from "../../address/model/AddressModel";
import CustomerModel from "../model/CustomerModel";
import DatabaseError from "../../../../../domain/@shared/Errors/DatabaseError";


export default class CustomerRepositorySequelize implements CustomerRepositoryInterface{
  async findByEmail(email:string): Promise<Customer> {

      try {
        const result= await CustomerModel.findOne({where:{email:email},include:[AddressModel]})
      
        if(result){
          return this.changeForCustomer(result)
      }

      throw new DatabaseError("customer not found!\n")
  } catch (error) {
    throw new DatabaseError("error find customer record\n")
  }
    
  }

   
   async create(entity: Customer): Promise<void> {
  try {
   await CustomerModel.create({
      id:entity.Id,
      name:entity.Name,
      cpf:entity.Cpf,
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
    throw new DatabaseError("error creating customer record!\n")
  }
  
    
    }


   async findById(id: string): Promise<Customer> {
    try {
      const result=await CustomerModel.findOne({where:{id:id}, include: [{ model: AddressModel}]})
        if(result){
            return this.changeForCustomer(result)
        }
        throw new DatabaseError("customer not found!")
    } catch (error) {
      throw new DatabaseError("error find customer record\n")
    }
        
    }

    async updateById(id: string, entity: Customer): Promise<void> {
      try {
      
        const customer = await CustomerModel.findByPk(id, { include: [AddressModel] });
    
        if (customer) {
          if (entity.Address) {
            await customer.address.update({
              uf: entity.Address.Uf,
              city: entity.Address.City,
              neighborhood: entity.Address.Neighborhood,
              zipCode: entity.Address.ZipCode,
              street: entity.Address.Street,
              number: entity.Address.Number,
              description: entity.Address.Description
            });
          }
          await customer.update({
            name: entity.Name,
            cpf: entity.Cpf,
            email: entity.Email,
            date_of_birth: entity.Date_of_birth,
            isActive: true,
          
          });
          return;
        }
    
        throw new DatabaseError("customer not found!");
      } catch (error) {
        throw new DatabaseError('Error updating customer record!\n');
      }
    }
    async findAll(sort: "desc" | "asc"="desc", filter: string="", limit: number=7, page: number=1): Promise<RepositoryFindAllResult<Customer>> {
      try {
        let findAllCustomerResult:Customer[]=[];
        const result= await CustomerModel.findAndCountAll({
            where:{name:{[Op.like]:`%${filter}%`}},
            order:[["name",sort]],
            limit:limit,
            offset:(page-1)*limit,
            include: [{ model: AddressModel}]
          })
          const totalElements=result.count
          const totalPages = Math.ceil(totalElements / limit);

          result.rows.forEach((res)=>{
            findAllCustomerResult.push(this.changeForCustomer(res))
          })

          const findAllResult:RepositoryFindAllResult<Customer>={
            entity:findAllCustomerResult,
            current_page:page,
            number_of_elements:totalElements,
            total_page:totalPages
           };
           return findAllResult
          
      } catch (error) {
        throw new DatabaseError("error listing customer record!\n")
      }
    }

   
    async deleteById(id: string): Promise<void> {
    
      try {
        await CustomerModel.destroy({where:{id:id}})
      } catch (error) {
        throw new DatabaseError("error when deleting customer record!\n")
        
      }
    }

    private changeForCustomer(entity:CustomerModel){
      const customer=new Customer(entity.id,entity.name,entity.cpf,entity.email,entity.date_of_birth)
      const address=new Address(entity.address.uf,entity.address.city,entity.address.neighborhood,
      entity.address.zipCode,entity.address.street,entity.address.number,entity.address.description)
      customer.changeAddress(address)
      return customer;
    }
}