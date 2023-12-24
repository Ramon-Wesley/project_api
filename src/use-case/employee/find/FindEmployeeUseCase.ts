import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/Employee.repository.interface";
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
            const result=await this.employeeRepository.findById(input.id);
            if(result && result.Address){
                const findResult:FindEmployeeOutDto={    
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
            return findResult;
            }
            throw new Error("employee not found!")
        } catch (error) {
            const err=error as Error;
            throw new Error(err.message);
        }
    }
    
}