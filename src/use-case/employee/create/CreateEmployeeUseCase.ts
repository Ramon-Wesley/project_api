import Address from "../../../domain/@shared/object-value/address/Address";
import EmployeeFactory from "../../../domain/employee/factory/EmployeeFactory";
import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/Employee.repository.interface";
import useCaseInterface from "../../@shared/UseCaseInterface";
import CreateEmployeeInDto from "./CreateEmployeeInDto";

export default class CreateEmployeeUseCase implements useCaseInterface<CreateEmployeeInDto,void>{
    private employeeRepository:EmployeeRepositoryInterface;

    constructor(employeeRepository:EmployeeRepositoryInterface){
        this.employeeRepository=employeeRepository;
    }

    async execute(input: CreateEmployeeInDto): Promise<void> {
        try {
            const employee=EmployeeFactory.create(input.name,input.ra,input.email,input.date_of_birth)
            if(input.address){
                const address= new Address(input.address.uf,input.address.city,input.address.neighborhood,input.address.zipCode,
                    input.address.street,input.address.number,input.address.description)
                    employee.changeAddress(address)
            } 
            await this.employeeRepository.create(employee)   
        } catch (error) {
            const err=error as Error
            throw new Error(error as string)
        }
    }

}