import CategoryRepositorySequelize from "../checkout/products/category/repository/CategoryRepository";
import ProductRepositorySequelize from "../checkout/products/repository/ProductRepository";
import CustomerRepositorySequelize from "../customer/repository/CustomerRepositorySequelize";
import EmployeeRepositorySequelize from "../employee/repository/EmployeeRepositorySequelize";
import RefreshTokenRepositorySequelize from "../refreshToken/repository/RefreshTokenRepositorySequelize";
import SupplierRepositorySequelize from "../supplier/repository/SupplierRepositorySequelize";
import UserRepositorySequelize from "../user/repository/UserRepositorySequelize";

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

    static userRepository(){
        return new UserRepositorySequelize()
    }

    static refreshTokenRepository(){
        return new RefreshTokenRepositorySequelize()
   

}

}
