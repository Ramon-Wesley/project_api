import { Sequelize } from 'sequelize-typescript';
import SequelizeDb from '../sequelize/config/SequelizeDB';


export default class DbFactory{
    public static  execute(){
        switch (process.env.TYPE_ORM) {
            case "sequelize":
                return SequelizeDb.getInstance();
                break;
            default:
                return SequelizeDb.getInstance();
                break;
        }
    }
}