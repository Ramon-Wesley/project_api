import RepositoriesSequelizeFactory from "../sequelize/factory/RepositoriesSequelizeFactory";

export default class DbFactoryRepositories{

    private static  execute(){
        switch (process.env.TYPE_ORM) {
            case "sequelize":
                return RepositoriesSequelizeFactory;
                break;
            default:
                return RepositoriesSequelizeFactory;
                break;
        }
    }

    static customerRepository(){
        return DbFactoryRepositories.execute().customerRepository()
    }
    
    static employeeRepository(){
        return DbFactoryRepositories.execute().employeeRepository()
    }

    static supplierRepository(){
        return DbFactoryRepositories.execute().supplierRepository()
    }

    static userRepository(){
        return DbFactoryRepositories.execute().userRepository()
    }

    static categoryRepository(){
        return DbFactoryRepositories.execute().categoryRepository()
    }

    static productRepository(){
        return DbFactoryRepositories.execute().productRepository()
    }

    static purchaseOrderRepository(){
        return DbFactoryRepositories.execute().purchaseOrderRepository()
    }

    static salesOrderRepository(){
        return DbFactoryRepositories.execute().salesOrderRepository()
    }




}