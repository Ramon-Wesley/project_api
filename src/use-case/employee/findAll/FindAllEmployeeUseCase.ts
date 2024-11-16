
import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/Employee.repository.interface";
import CacheFactory from "../../../infrastructure/cache/factory/CacheFactory";
import useCaseInterface from "../../@shared/UseCaseInterface";
import FindAllEmployeeInDto from "./FindAllEmployeeInDto";
import FindAllEmployeeOutDto from "./FindAllEmployeeOutDto";


export default class FindAllEmployeeUseCase implements useCaseInterface<FindAllEmployeeInDto,FindAllEmployeeOutDto>{
    private employeeRepository:EmployeeRepositoryInterface;

    constructor(employeeRepository:EmployeeRepositoryInterface){
        this.employeeRepository=employeeRepository;
    }

    async execute(input: FindAllEmployeeInDto): Promise<FindAllEmployeeOutDto> {
        try {
            const cache=CacheFactory.execute()
            let findResult:FindAllEmployeeOutDto;
            let key="employee: "
            key+=Object.values(input).join(",")
              const client=await cache.getValue(key)
              
              if(client){
                findResult=JSON.parse(client) as FindAllEmployeeOutDto
                return findResult
                }
              
          const result=await this.employeeRepository.findAll(input.sort,input.filter,input.limit,input.page);  
  
        findResult={
              entity: result.entity.map((res) =>{return{
                id:res.Id,
                name:res.Name,
                ra:res.Ra,
                email:res.Email,
                date_of_birth:res.Date_of_birth,
                address:{
                    uf:res.Address?.Uf,
                    city:res.Address?.City,
                    neighborhood:res.Address?.Neighborhood,
                    zipCode:res.Address?.ZipCode,
                    street:res.Address?.Street,
                    number:res.Address?.Number,
                    description:res.Address?.Description,
                },
            isActive:res.IsActive
            }
        } ),
            current_page:result.current_page,
            number_of_elements:result.number_of_elements,
            total_page:result.total_page
        }
        await cache.insertValue(key,JSON.stringify(findResult))
          return findResult;
        } catch (error) {
            throw error
        }
    }
}