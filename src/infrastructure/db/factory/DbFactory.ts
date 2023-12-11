import { Sequelize } from 'sequelize-typescript';
import SequelizeMemory from '../sequelize/config/SequelizeMemory';
import SequelizeFactory from '../sequelize/factory/Sequelize.factory';

export default class DbFactory{
    public static  execute(){
        switch (process.env.TYPE_ORM) {
            case "sequelize":
                return SequelizeFactory.execute();
                break;
            default:
                return SequelizeFactory.execute();
                break;
        }
    }
}