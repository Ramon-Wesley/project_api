import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/Employee.repository.interface";
import CacheFactory from "../../../infrastructure/cache/factory/CacheFactory";
import useCaseInterface from "../../@shared/UseCaseInterface";
import FindEmployeeINDto from "./FindEmployeeNDto";
import FindEmployeeOutDto from "./FindEmployeeOutDto";


export default class FindEmployeeUseCase implements useCaseInterface<FindEmployeeINDto,FindEmployeeOutDto>{
    private employeeRepository:EmployeeRepositoryInterface;
    
    constructor(employeeRepository:EmployeeRepositoryInterface){
        this.employeeRepository=employeeRepository;
    }

    async execute(input: FindEmployeeINDto): Promise<FindEmployeeOutDto> {
        try {
            const cache=CacheFactory.execute()
            let findResult:FindEmployeeOutDto;
            const key=input.id
           
              const client=await cache.getValue(key)
              
              if(client){
                findResult=JSON.parse(client) as FindEmployeeOutDto
                return findResult
                }
              
            const result=await this.employeeRepository.findById(input.id);
            if(result && result.Address){
                findResult={    
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
            const err=error as Error;
            throw new Error(err.message);
        }
    }
    
}