import CategoryRepositorySequelize from "../checkout/products/category/repository/CategoryRepository";
import ProductRepositorySequelize from "../checkout/products/repository/ProductRepository";
import CustomerRepositorySequelize from "../customer/repository/CustomerRepositorySequelize";
import EmployeeRepositorySequelize from "../employee/repository/EmployeeRepositorySequelize";
import SupplierRepositorySequelize from "../supplier/repository/SupplierRepositorySequelize";

export default class RepositoriesSequelizeFactory{

    private constructor(){}

    static customerRepository(){
        return new CustomerRepositorySequelize()
    }
    
    static employeeRepository(){
        return new EmployeeRepositorySequelize()
    }

    static supplierRepository(){
        return new SupplierRepositorySequelize()
    }

    static categoryRepository(){
        return new CategoryRepositorySequelize()
    }

    static productRepository(){
        return new ProductRepositorySequelize()
    }

   

}

