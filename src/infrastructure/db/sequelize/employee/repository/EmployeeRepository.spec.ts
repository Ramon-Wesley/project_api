import { Op } from "sequelize"
import Address from "../../../../../domain/@shared/object-value/address/Address"
import Employee from "../../../../../domain/employee/entity/Employee"
import EmployeeFactory from "../../../../../domain/employee/factory/EmployeeFactory"
import AddressModel from "../../address/model/AddressModel"

import EmployeeModel from "../model/EmployeeModel"

import SequelizeFactory from "../../factory/Sequelize.factory"
import EmployeeRepositorySequelize from "./EmployeeRepositorySequelize"
import { Sequelize } from "sequelize-typescript"





describe("Test the employee repository", ()=>{
  
  let sequelize:Sequelize;  

      
  beforeEach(async()=>{ 
    sequelize= await SequelizeFactory.execute();           

    })

     afterEach(async()=>{
        await sequelize.close()
        
    })

    it("save employee data correctly",async ()=>{
        const employeeRepository= new EmployeeRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})
        expect(employeeModel?.toJSON()).toStrictEqual({
            id:employee.Id,
            name:employee.Name,
            ra:employee.Ra,
            email:employee.Email,
            address_id: 1,
            date_of_birth:employee.Date_of_birth,
            isActive:true,
            address:  {
              city: employee.Address?.City,
              description: employee.Address?.Description,
              id: 1,
              neighborhood: employee.Address?.Neighborhood,
                  number: employee.Address?.Number,
                   street: employee.Address?.Street,
                   uf: employee.Address?.Uf,
                     zipCode: employee.Address?.ZipCode,
                   },
        })

    })

    it("update employee data correctly",async ()=>{

        const employeeRepository= new EmployeeRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})
        expect(employeeModel?.toJSON()).toStrictEqual({
            id:employee.Id,
            name:employee.Name,
            ra:employee.Ra,
            email:employee.Email,
            address_id: 1,
            date_of_birth:employee.Date_of_birth,
            isActive:true,
                 address:  {
                 city: employee.Address?.City,
                 description: employee.Address?.Description,
                  id: 1,
                   neighborhood: employee.Address?.Neighborhood,
                   number: employee.Address?.Number,
                   street: employee.Address?.Street,
                   uf: employee.Address?.Uf,
                     zipCode: employee.Address?.ZipCode,
                   },
        })
        const addressUpdate=new Address("SC","city2","bairro2","35170-302","ruac","1234","description")
        const employeeUpdate=new Employee(employee.Id,"employee2","11223344",
        "employee2@hotmail.com",new Date("2002-02-02"))
        employeeUpdate.changeAddress(addressUpdate)

        await employeeRepository.updateById(employee.Id,employeeUpdate)

        const employeeModelUpdate=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})
        expect(employeeModelUpdate?.toJSON()).toStrictEqual({
            id:employeeUpdate.Id,
            name:employeeUpdate.Name,
            ra:employeeUpdate.Ra,
            email:employeeUpdate.Email,
            address_id: 1,
            date_of_birth:employeeUpdate.Date_of_birth,
            isActive:true,
                 address:  {
                 city: employeeUpdate.Address?.City,
                 description: employeeUpdate.Address?.Description,
                  id: 1,
                   neighborhood: employeeUpdate.Address?.Neighborhood,
                   number: employeeUpdate.Address?.Number,
                   street: employeeUpdate.Address?.Street,
                   uf: employeeUpdate.Address?.Uf,
                     zipCode: employeeUpdate.Address?.ZipCode,
                   },
        })

    })
    
   

    it("find employee data by id",async ()=>{
        const employeeRepository= new EmployeeRepositorySequelize(); 
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);

        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})
        
        const findModel=await employeeRepository.findById(employee.Id)
        
        expect(employeeModel?.toJSON()).toStrictEqual({
            id:findModel.Id,
            name:findModel.Name,
            ra:findModel.Ra,
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

    it("find all employee data ",async ()=>{
        const employeeRepository= new EmployeeRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        const address2=new Address("SC","city2","bairro2","35170-302","ruac","1234","description")
        
        const employee2= EmployeeFactory.createWithAddress("employee2","11223344",
        "employee2@hotmail.com",new Date("2002-02-02"),address2)
        
        
        await employeeRepository.create(employee);
        await employeeRepository.create(employee2)
        const sort="desc"
        const filter=""
        const limit=7
        const page=1

        const employeeModel=await employeeRepository.findAll(sort,filter,limit,page)
        
        const result= await EmployeeModel.findAndCountAll({
          where:{name:{[Op.like]:`%${filter}%`}},
          order:[["name",sort]],
          limit:limit,
          offset:(page-1)*limit,
          include: [{ model: AddressModel}]
        })

        expect(result.rows.map((res) => res.toJSON())).toEqual([
          {
            address: {
              city: employeeModel.entity[0].Address?.City,
              description: employeeModel.entity[0].Address?.Description,
              id: 2,
              neighborhood: employeeModel.entity[0].Address?.Neighborhood,
              number: employeeModel.entity[0].Address?.Number,
              street: employeeModel.entity[0].Address?.Street,
              uf: employeeModel.entity[0].Address?.Uf,
              zipCode: employeeModel.entity[0].Address?.ZipCode,
            },
            ra: employeeModel.entity[0].Ra,
            date_of_birth: employeeModel.entity[0].Date_of_birth,
            email: employeeModel.entity[0].Email,
            address_id: 2,
            id: employeeModel.entity[0].Id,
            isActive: employeeModel.entity[0].IsActive,
            name: employeeModel.entity[0].Name,
          },
          {
            address: {
              city: employeeModel.entity[1].Address?.City,
              description: employeeModel.entity[1].Address?.Description,
              id: 1,
              neighborhood: employeeModel.entity[1].Address?.Neighborhood,
              number: employeeModel.entity[1].Address?.Number,
              street: employeeModel.entity[1].Address?.Street,
              uf: employeeModel.entity[1].Address?.Uf,
              zipCode: employeeModel.entity[1].Address?.ZipCode,
            },
            ra: employeeModel.entity[1].Ra,
            date_of_birth: employeeModel.entity[1].Date_of_birth,
            email: employeeModel.entity[1].Email,
            address_id: 1,
            id: employeeModel.entity[1].Id,
            isActive: employeeModel.entity[1].IsActive,
            name: employeeModel.entity[1].Name,
          },
        ]);

      expect(employeeModel.current_page).toBe(page)
      expect(employeeModel.number_of_elements).toBe(2)
      expect(employeeModel.total_page).toBe(1)


})
    it("delete by id employee data",async()=>{
      const employeeRepository= new EmployeeRepositorySequelize();
        const address=new Address("MG","city1","bairro","35170-300","ruab","123")
        const employee=EmployeeFactory.createWithAddress("employee1","12345678",
        "employee@hotmail.com",new Date("2000-01-01"),address)
        
        await employeeRepository.create(employee);
        const employeeModel=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})
        expect(employeeModel?.toJSON()).toStrictEqual({
            id:employee.Id,
            name:employee.Name,
            ra:employee.Ra,
            email:employee.Email,
            address_id: 1,
            date_of_birth:employee.Date_of_birth,
            isActive:true,
                 address:  {
                 city: employee.Address?.City,
                 description: employee.Address?.Description,
                  id: 1,
                   neighborhood: employee.Address?.Neighborhood,
                   number: employee.Address?.Number,
                   street: employee.Address?.Street,
                   uf: employee.Address?.Uf,
                     zipCode: employee.Address?.ZipCode,
                   },
        })
        await employeeRepository.deleteById(employee.Id)
        const employeeDeleteResult=await EmployeeModel.findOne({where:{id:employee.Id}, include: [{ model: AddressModel}]})
        expect(employeeDeleteResult).toBeNull()
        
})

})