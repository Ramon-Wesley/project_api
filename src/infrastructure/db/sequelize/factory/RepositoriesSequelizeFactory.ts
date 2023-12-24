import CustomerRepositorySequelize from "../customer/repository/CustomerRepositorySequelize";
import EmployeeRepositorySequelize from "../employee/repository/EmployeeRepositorySequelize";

export default class RepositoriesSequelizeFactory{

    private constructor(){}

    static customerRepository(){
        return new CustomerRepositorySequelize()
    }
    
    static employeeRepository(){
        return new EmployeeRepositorySequelize()
    }
}

RepositoriesSequelizeFactory.customerRepository()