import { Op } from "sequelize"
import Address from "../../../../../domain/@shared/object-value/address/Address"
import Customer from "../../../../../domain/customer/entity/Customer"
import CustomerFactory from "../../../../../domain/customer/factory/CustomerFactory"
import AddressModel from "../../address/model/AddressModel"

import CustomerModel from "../model/CustomerModel"
import CustomerRepositorySequelize from "./CustomerRepositorySequelize"
import { Sequelize } from "sequelize-typescript"
import SequelizeDb from "../../config/SequelizeDB"




describe("Test the customer repository", ()=>{
  let sequelize:Sequelize;  

      
   beforeEach(async()=>{ 
    sequelize= await SequelizeDb.getInstance();       
 
     })
 
      afterEach(async()=>{
         await sequelize.close()
         
     })

    it("save customer data correctly",async ()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})
        expect(customerModel?.toJSON()).toStrictEqual({
            id:customer.Id,
            name:customer.Name,
            cpf:customer.Cpf,
            email:customer.Email,
            address_id: 1,
            date_of_birth:customer.Date_of_birth,
            isActive:true,
            address:  {
              city: customer.Address?.City,
              description: customer.Address?.Description,
              id: 1,
              neighborhood: customer.Address?.Neighborhood,
                  number: customer.Address?.Number,
                   street: customer.Address?.Street,
                   uf: customer.Address?.Uf,
                     zipCode: customer.Address?.ZipCode,
                   },
        })

    })

    it("update customer data correctly",async ()=>{

        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})
        expect(customerModel?.toJSON()).toStrictEqual({
            id:customer.Id,
            name:customer.Name,
            cpf:customer.Cpf,
            email:customer.Email,
            address_id: 1,
            date_of_birth:customer.Date_of_birth,
            isActive:true,
                 address:  {
                 city: customer.Address?.City,
                 description: customer.Address?.Description,
                  id: 1,
                   neighborhood: customer.Address?.Neighborhood,
                   number: customer.Address?.Number,
                   street: customer.Address?.Street,
                   uf: customer.Address?.Uf,
                     zipCode: customer.Address?.ZipCode,
                   },
        })
        const addressUpdate=new Address("SC","city2","bairro2","35170-302","ruac","1234","description")
        const customerUpdate=new Customer(customer.Id,"customer2","828.074.700-17",
        "customer2@hotmail.com",new Date("2002-02-02"))
        customerUpdate.changeAddress(addressUpdate)

        await customerRepository.updateById(customer.Id,customerUpdate)

        const customerModelUpdate=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})
        expect(customerModelUpdate?.toJSON()).toStrictEqual({
            id:customerUpdate.Id,
            name:customerUpdate.Name,
            cpf:customerUpdate.Cpf,
            email:customerUpdate.Email,
            address_id: 1,
            date_of_birth:customerUpdate.Date_of_birth,
            isActive:true,
                 address:  {
                 city: customerUpdate.Address?.City,
                 description: customerUpdate.Address?.Description,
                  id: 1,
                   neighborhood: customerUpdate.Address?.Neighborhood,
                   number: customerUpdate.Address?.Number,
                   street: customerUpdate.Address?.Street,
                   uf: customerUpdate.Address?.Uf,
                     zipCode: customerUpdate.Address?.ZipCode,
                   },
        })

    })
    
   

    it("find customer data by id",async ()=>{
        const customerRepository= new CustomerRepositorySequelize(); 
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);

        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})
        
        const findModel=await customerRepository.findById(customer.Id)
        
        expect(customerModel?.toJSON()).toStrictEqual({
            id:findModel.Id,
            name:findModel.Name,
            cpf:findModel.Cpf,
            email:findModel.Email,
            address_id: 1,
            date_of_birth:findModel.Date_of_birth,
            isActive:true,
                 address:  {
                 city: findModel.Address?.City,
                 description: findModel.Address?.Description,
                  id: 1,
                   neighborhood: findModel.Address?.Neighborhood,
                   number: findModel.Address?.Number,
                   street: findModel.Address?.Street,
                   uf: findModel.Address?.Uf,
                     zipCode: findModel.Address?.ZipCode,
                   },
        })

    })
 
    it("find all customer data ",async ()=>{
        const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        const address2=new Address("SC","city2","bairro2","35170-302","ruac","1234","description")
        
        const customer2= CustomerFactory.createWithAddress("customer2","828.074.700-17",
        "customer2@hotmail.com",new Date("2002-02-02"),address2)
        
        
        await customerRepository.create(customer);
        await customerRepository.create(customer2)
        const sort="desc"
        const filter=""
        const limit=7
        const page=1

        const customerModel=await customerRepository.findAll(sort,filter,limit,page)
        
        const result= await CustomerModel.findAndCountAll({
          where:{name:{[Op.like]:`%${filter}%`}},
          order:[["name",sort]],
          limit:limit,
          offset:(page-1)*limit,
          include: [{ model: AddressModel}]
        })

        expect(result.rows.map((res) => res.toJSON())).toEqual([
          {
            address: {
              city: customerModel.entity[0].Address?.City,
              description: customerModel.entity[0].Address?.Description,
              id: 2,
              neighborhood: customerModel.entity[0].Address?.Neighborhood,
              number: customerModel.entity[0].Address?.Number,
              street: customerModel.entity[0].Address?.Street,
              uf: customerModel.entity[0].Address?.Uf,
              zipCode: customerModel.entity[0].Address?.ZipCode,
            },
            cpf: customerModel.entity[0].Cpf,
            date_of_birth: customerModel.entity[0].Date_of_birth,
            email: customerModel.entity[0].Email,
            address_id: 2,
            id: customerModel.entity[0].Id,
            isActive: customerModel.entity[0].IsActive,
            name: customerModel.entity[0].Name,
          },
          {
            address: {
              city: customerModel.entity[1].Address?.City,
              description: customerModel.entity[1].Address?.Description,
              id: 1,
              neighborhood: customerModel.entity[1].Address?.Neighborhood,
              number: customerModel.entity[1].Address?.Number,
              street: customerModel.entity[1].Address?.Street,
              uf: customerModel.entity[1].Address?.Uf,
              zipCode: customerModel.entity[1].Address?.ZipCode,
            },
            cpf: customerModel.entity[1].Cpf,
            date_of_birth: customerModel.entity[1].Date_of_birth,
            email: customerModel.entity[1].Email,
            address_id: 1,
            id: customerModel.entity[1].Id,
            isActive: customerModel.entity[1].IsActive,
            name: customerModel.entity[1].Name,
          },
        ]);

      expect(customerModel.current_page).toBe(page)
      expect(customerModel.number_of_elements).toBe(2)
      expect(customerModel.total_page).toBe(1)


})
    it("delete by id customer data",async()=>{
      const customerRepository= new CustomerRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const customer=CustomerFactory.createWithAddress("customer1","533.408.010-45",
        "customer@hotmail.com",new Date("2000-01-01"),address)
        
        await customerRepository.create(customer);
        const customerModel=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})
        expect(customerModel?.toJSON()).toStrictEqual({
            id:customer.Id,
            name:customer.Name,
            cpf:customer.Cpf,
            email:customer.Email,
            address_id: 1,
            date_of_birth:customer.Date_of_birth,
            isActive:true,
                 address:  {
                 city: customer.Address?.City,
                 description: customer.Address?.Description,
                  id: 1,
                   neighborhood: customer.Address?.Neighborhood,
                   number: customer.Address?.Number,
                   street: customer.Address?.Street,
                   uf: customer.Address?.Uf,
                     zipCode: customer.Address?.ZipCode,
                   },
        })
        await customerRepository.deleteById(customer.Id)
        const customerDeleteResult=await CustomerModel.findOne({where:{id:customer.Id}, include: [{ model: AddressModel}]})
        expect(customerDeleteResult).toBeNull()
        
})


})