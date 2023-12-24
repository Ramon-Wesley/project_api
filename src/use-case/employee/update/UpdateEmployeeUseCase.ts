import Address from "../../../domain/@shared/object-value/address/Address";
import Employee from "../../../domain/employee/entity/Employee";
import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/Employee.repository.interface";

import useCaseInterface from "../../@shared/UseCaseInterface";
import UpdateEmployeeInDto from "./UpdateEmployeeINDto";



export default class UpdateEmployeeUseCase implements useCaseInterface<UpdateEmployeeInDto,void>{
    private employeeRepository:EmployeeRepositoryInterface;
    
    constructor(employeeRepository:EmployeeRepositoryInterface){
        this.employeeRepository=employeeRepository;
    }
    async execute(input: UpdateEmployeeInDto): Promise<void> {
        try {
            const employee=new Employee(input.id,input.name,input.ra,input.email,input.date_of_birth)
            if(input.address){
                const address= new Address(input.address.uf,input.address.city,input.address.neighborhood,input.address.zipCode,
                    input.address.street,input.address.number,input.address.description)
                    employee.changeAddress(address)
            } 
            await this.employeeRepository.updateById(input.id,employee);
        } catch (error) {
            const err=error as Error
            throw new Error(err.message)
        }
    }


}