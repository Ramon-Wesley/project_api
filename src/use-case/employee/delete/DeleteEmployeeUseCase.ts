
import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/Employee.repository.interface";
import useCaseInterface from "../../@shared/UseCaseInterface";
import DeleteEmployeeInDto from "./DeleteEmployeeInDto";

export default class DeleteEmployeeUseCase implements useCaseInterface<DeleteEmployeeInDto,void>{
    private employeeRepository:EmployeeRepositoryInterface;

    constructor(employeeRepository:EmployeeRepositoryInterface){
        this.employeeRepository=employeeRepository;
    }
    
   async execute(input: DeleteEmployeeInDto): Promise<void> {
        try {
            const findEmployee=await this.employeeRepository.findById(input.id)
            if(findEmployee){
                await this.employeeRepository.deleteById(input.id);
            }else{
                throw new Error("Employee not found!");
            }
        } catch (error) {
            throw error    
        }
    }

}