import RepositoriesSequelizeFactory from "../sequelize/factory/RepositoriesSequelizeFactory";

export default class DbFactoryRepositories{

    public static  execute(){
        switch (process.env.TYPE_ORM) {
            case "sequelize":
                return RepositoriesSequelizeFactory;
                break;
            default:
                return RepositoriesSequelizeFactory;
                break;
        }
    }
}