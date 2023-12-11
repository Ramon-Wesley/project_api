import { Op } from "sequelize"
import Address from "../../../../../domain/@shared/object-value/address/Address"
import Supplier from "../../../../../domain/supplier/entity/Supplier"
import SupplierFactory from "../../../../../domain/supplier/factory/SupplierFactory"
import AddressModel from "../../address/model/AddressModel"

import SupplierModel from "../model/SupplierModel"
import SupplierRepositorySequelize from "./SupplierRepositorySequelize"
import SequelizeFactory from "../../factory/Sequelize.factory"
import { Sequelize } from "sequelize-typescript"





describe("Test the supplier repository", ()=>{
  
   
  let sequelize:Sequelize;  

      
   beforeEach(async()=>{ 
    sequelize= await SequelizeFactory.execute();      
 
     })
 
      afterEach(async()=>{
         await sequelize.close()
         
     })

    it("save supplier data correctly",async ()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","15.287.087/0001-05",
        "supplier@hotmail.com",new Date("2000-01-01"),address)
        
        await supplierRepository.create(supplier);
        const supplierModel=await SupplierModel.findOne({where:{id:supplier.Id}, include: [{ model: AddressModel}]})
        expect(supplierModel?.toJSON()).toStrictEqual({
            id:supplier.Id,
            name:supplier.Name,
            cnpj:supplier.Cnpj,
            email:supplier.Email,
            address_id: 1,
            date_of_birth:supplier.Date_of_birth,
            isActive:true,
            address:  {
              city: supplier.Address?.City,
              description: supplier.Address?.Description,
              id: 1,
              neighborhood: supplier.Address?.Neighborhood,
                  number: supplier.Address?.Number,
                   street: supplier.Address?.Street,
                   uf: supplier.Address?.Uf,
                     zipCode: supplier.Address?.ZipCode,
                   },
        })

    })

    it("update supplier data correctly",async ()=>{

        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","15.287.087/0001-05",
        "supplier@hotmail.com",new Date("2000-01-01"),address)
        
        await supplierRepository.create(supplier);
        const supplierModel=await SupplierModel.findOne({where:{id:supplier.Id}, include: [{ model: AddressModel}]})
        expect(supplierModel?.toJSON()).toStrictEqual({
            id:supplier.Id,
            name:supplier.Name,
            cnpj:supplier.Cnpj,
            email:supplier.Email,
            address_id: 1,
            date_of_birth:supplier.Date_of_birth,
            isActive:true,
                 address:  {
                 city: supplier.Address?.City,
                 description: supplier.Address?.Description,
                  id: 1,
                   neighborhood: supplier.Address?.Neighborhood,
                   number: supplier.Address?.Number,
                   street: supplier.Address?.Street,
                   uf: supplier.Address?.Uf,
                     zipCode: supplier.Address?.ZipCode,
                   },
        })
        const addressUpdate=new Address("SC","city2","bairro2","35170-302","ruac","1234","description")
        const supplierUpdate=new Supplier(supplier.Id,"supplier2","36.605.835/0001-12",
        "supplier2@hotmail.com",new Date("2002-02-02"))
        supplierUpdate.changeAddress(addressUpdate)

        await supplierRepository.updateById(supplier.Id,supplierUpdate)

        const supplierModelUpdate=await SupplierModel.findOne({where:{id:supplier.Id}, include: [{ model: AddressModel}]})
        expect(supplierModelUpdate?.toJSON()).toStrictEqual({
            id:supplierUpdate.Id,
            name:supplierUpdate.Name,
            cnpj:supplierUpdate.Cnpj,
            email:supplierUpdate.Email,
            address_id: 1,
            date_of_birth:supplierUpdate.Date_of_birth,
            isActive:true,
                 address:  {
                 city: supplierUpdate.Address?.City,
                 description: supplierUpdate.Address?.Description,
                  id: 1,
                   neighborhood: supplierUpdate.Address?.Neighborhood,
                   number: supplierUpdate.Address?.Number,
                   street: supplierUpdate.Address?.Street,
                   uf: supplierUpdate.Address?.Uf,
                     zipCode: supplierUpdate.Address?.ZipCode,
                   },
        })

    })
    
   

    it("find supplier data by id",async ()=>{
        const supplierRepository= new SupplierRepositorySequelize(); 
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","15.287.087/0001-05",
        "supplier@hotmail.com",new Date("2000-01-01"),address)
        
        await supplierRepository.create(supplier);

        const supplierModel=await SupplierModel.findOne({where:{id:supplier.Id}, include: [{ model: AddressModel}]})
        
        const findModel=await supplierRepository.findById(supplier.Id)
        
        expect(supplierModel?.toJSON()).toStrictEqual({
            id:findModel.Id,
            name:findModel.Name,
            cnpj:findModel.Cnpj,
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

    it("find all supplier data ",async ()=>{
        const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","15.287.087/0001-05",
        "supplier@hotmail.com",new Date("2000-01-01"),address)
        const address2=new Address("SC","city2","bairro2","35170-302","ruac","1234","description")
        
        const supplier2= SupplierFactory.createWithAddress("supplier2","36.605.835/0001-12",
        "supplier2@hotmail.com",new Date("2002-02-02"),address2)
        
        
        await supplierRepository.create(supplier);
        await supplierRepository.create(supplier2)
        const sort="desc"
        const filter=""
        const limit=7
        const page=1

        const supplierModel=await supplierRepository.findAll(sort,filter,limit,page)
        
        const result= await SupplierModel.findAndCountAll({
          where:{name:{[Op.like]:`%${filter}%`}},
          order:[["name",sort]],
          limit:limit,
          offset:(page-1)*limit,
          include: [{ model: AddressModel}]
        })

        expect(result.rows.map((res) => res.toJSON())).toEqual([
          {
            address: {
              city: supplierModel.entity[0].Address?.City,
              description: supplierModel.entity[0].Address?.Description,
              id: 2,
              neighborhood: supplierModel.entity[0].Address?.Neighborhood,
              number: supplierModel.entity[0].Address?.Number,
              street: supplierModel.entity[0].Address?.Street,
              uf: supplierModel.entity[0].Address?.Uf,
              zipCode: supplierModel.entity[0].Address?.ZipCode,
            },
            cnpj: supplierModel.entity[0].Cnpj,
            date_of_birth: supplierModel.entity[0].Date_of_birth,
            email: supplierModel.entity[0].Email,
            address_id: 2,
            id: supplierModel.entity[0].Id,
            isActive: supplierModel.entity[0].IsActive,
            name: supplierModel.entity[0].Name,
          },
          {
            address: {
              city: supplierModel.entity[1].Address?.City,
              description: supplierModel.entity[1].Address?.Description,
              id: 1,
              neighborhood: supplierModel.entity[1].Address?.Neighborhood,
              number: supplierModel.entity[1].Address?.Number,
              street: supplierModel.entity[1].Address?.Street,
              uf: supplierModel.entity[1].Address?.Uf,
              zipCode: supplierModel.entity[1].Address?.ZipCode,
            },
            cnpj: supplierModel.entity[1].Cnpj,
            date_of_birth: supplierModel.entity[1].Date_of_birth,
            email: supplierModel.entity[1].Email,
            address_id: 1,
            id: supplierModel.entity[1].Id,
            isActive: supplierModel.entity[1].IsActive,
            name: supplierModel.entity[1].Name,
          },
        ]);

      expect(supplierModel.current_page).toBe(page)
      expect(supplierModel.number_of_elements).toBe(2)
      expect(supplierModel.total_page).toBe(1)


})
    it("delete by id supplier data",async()=>{
      const supplierRepository= new SupplierRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const supplier=SupplierFactory.createWithAddress("supplier1","15.287.087/0001-05",
        "supplier@hotmail.com",new Date("2000-01-01"),address)
        
        await supplierRepository.create(supplier);
        const supplierModel=await SupplierModel.findOne({where:{id:supplier.Id}, include: [{ model: AddressModel}]})
        expect(supplierModel?.toJSON()).toStrictEqual({
            id:supplier.Id,
            name:supplier.Name,
            cnpj:supplier.Cnpj,
            email:supplier.Email,
            address_id: 1,
            date_of_birth:supplier.Date_of_birth,
            isActive:true,
                 address:  {
                 city: supplier.Address?.City,
                 description: supplier.Address?.Description,
                  id: 1,
                   neighborhood: supplier.Address?.Neighborhood,
                   number: supplier.Address?.Number,
                   street: supplier.Address?.Street,
                   uf: supplier.Address?.Uf,
                     zipCode: supplier.Address?.ZipCode,
                   },
        })
        await supplierRepository.deleteById(supplier.Id)
        const supplierDeleteResult=await SupplierModel.findOne({where:{id:supplier.Id}, include: [{ model: AddressModel}]})
        expect(supplierDeleteResult).toBeNull()
        
})

})