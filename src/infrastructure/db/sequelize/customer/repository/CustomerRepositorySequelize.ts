import { Op } from "sequelize";
import Address from "../../../../../domain/@shared/object-value/address/Address";
import RepositoryFindAllResult from "../../../../../domain/@shared/repository/RepositoryFindAllResult";
import Customer from "../../../../../domain/customer/entity/Customer";
import CustomerRepositoryInterface from "../../../../../domain/customer/repository/CustomerRepositoryInterface";
import AddressModel from "../../address/model/AddressModel";
import CustomerModel from "../model/CustomerModel";


export default class CustomerRepositorySequelize implements CustomerRepositoryInterface{
  async findByEmail(email:string): Promise<Customer> {

      try {
        const result= await CustomerModel.findOne({where:{email:email},include:[AddressModel]})
       
        if(result){
          const customer=new Customer(result.id,result.name,result.cpf,result.email,result.date_of_birth)
          const address=new Address(result.address.uf,result.address.city,result.address.neighborhood,
          result.address.zipCode,result.address.street,result.address.number,result.address.description)
          customer.changeAddress(address)
          return customer
      }
      throw new Error("customer not found!!")
  } catch (error) {
    throw new Error("error when fetching customer with email record!\n"+error)
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
    throw new Error("error creating customer record\n"+error)
  }
  
    
    }


   async findById(id: string): Promise<Customer> {
    try {
      const result=await CustomerModel.findOne({where:{id:id}, include: [{ model: AddressModel}]})
        if(result){
            const customer=new Customer(result.id,result.name,result.cpf,result.email,result.date_of_birth)
            const address=new Address(result.address.uf,result.address.city,result.address.neighborhood,
            result.address.zipCode,result.address.street,result.address.number,result.address.description)
            customer.changeAddress(address)
            return customer
        }
        throw new Error("customer not found!")
    } catch (error) {
      throw new Error("error when fetching customer record!\n"+error)
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
    
        throw new Error('customer not found!');
      } catch (error) {
        throw new Error('Error updating customer record!\n' + error);
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
            let customer=new Customer(res.id,res.name,res.cpf,res.email,res.date_of_birth)
           let address=new Address(res.address.uf,res.address.city,res.address.neighborhood,res.address.zipCode,res.address.street,res.address.number,res.address.description)
            customer.changeAddress(address)
            findAllCustomerResult.push(customer)
          })

          const findAllResult:RepositoryFindAllResult<Customer>={
            entity:findAllCustomerResult,
            current_page:page,
            number_of_elements:totalElements,
            total_page:totalPages
           };
           return findAllResult
          
      } catch (error) {
        throw new Error("error listing customer record!\n"+error)
      }
    


    }

   
    async deleteById(id: string): Promise<void> {
    
      try {
        await CustomerModel.destroy({where:{id:id}})
      } catch (error) {
        throw new Error("error when deleting customer record!\n"+error)
        
      }
    }

}