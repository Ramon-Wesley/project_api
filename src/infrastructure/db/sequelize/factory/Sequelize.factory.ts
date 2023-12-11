import { Sequelize } from 'sequelize-typescript';
import SequelizeMemory from '../config/SequelizeMemory';
import CustomerModel from '../customer/model/CustomerModel';
import AddressModel from '../address/model/AddressModel';
import SequelizePostgres from '../config/SequelizePostgres';


export default class SequelizeFactory{

    public static  execute(){
        switch (process.env.TYPE_DATABASE) {
            case "memory":
                return SequelizeMemory.getInstance()
                break;
            case "postgres":
                return SequelizePostgres.getInstance()
                break;
            default:
                return SequelizeMemory.getInstance()
                break;
        }
    }
}