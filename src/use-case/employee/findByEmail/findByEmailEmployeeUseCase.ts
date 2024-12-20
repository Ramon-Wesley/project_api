import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/Employee.repository.interface";
import CacheFactory from "../../../infrastructure/cache/factory/CacheFactory";
import useCaseInterface from "../../@shared/UseCaseInterface";

import FindByEmailEmployeeInDto from "./FindByEmailEmployeeInDto";
import FindByEmailEmployeeOutDto from "./findByEmailEmployeeOutDto";


export default class FindByEmailEmployeeUseCase implements useCaseInterface<FindByEmailEmployeeInDto,FindByEmailEmployeeOutDto>{
    private employeeRepository:EmployeeRepositoryInterface;
    
    constructor(employeeRepository:EmployeeRepositoryInterface){
        this.employeeRepository=employeeRepository;
    }

    async execute(input: FindByEmailEmployeeInDto): Promise<FindByEmailEmployeeOutDto> {
        try {
            const cache=CacheFactory.execute()
            let findResult:FindByEmailEmployeeOutDto;
            let key=input.email
            
              const client=await cache.getValue(key)
              
              if(client){
                findResult=JSON.parse(client) as FindByEmailEmployeeOutDto
                return findResult
                }
                
            const result=await this.employeeRepository.findByEmail(input.email);
            if(result && result.Address){
                const findResult:FindByEmailEmployeeOutDto={ 
                id:result.Id,   
                name:result.Name,
                email:result.Email,
                ra:result.Ra,
                date_of_birth:result.Date_of_birth,
                isActive:result.IsActive,
                address:{
                    city:result.Address.City,
                    uf:result.Address?.Uf,
                    description:result.Address?.Description,
                    neighborhood:result.Address?.Neighborhood,
                    number:result.Address?.Number,
                    street:result.Address?.Street,
                    zipCode:result.Address?.ZipCode
                }
                
            }
            await cache.insertValue(key,JSON.stringify(findResult))
            return findResult;
            }
            throw new Error("employee not found!")
        } catch (error) {
            throw error
        }
    }
    
}