import RepositoryInterface from "../../@shared/repository/RepositoryInterface";
import Employee from "../entity/Employee";

export interface EmployeeRepositoryInterface extends RepositoryInterface<Employee>{

    findByEmail(email:string):Promise<Employee>

}