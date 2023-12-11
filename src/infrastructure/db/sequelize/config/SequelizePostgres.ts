import {Sequelize} from "sequelize-typescript"
import AddressModel from "../address/model/AddressModel"
import CustomerModel from "../customer/model/CustomerModel"
import SupplierModel from "../supplier/model/SupplierModel";
import EmployeeModel from "../employee/model/EmployeeModel";
import ProductModel from "../checkout/products/model/ProductModel";
import { PurchaseOrderModel } from "../checkout/purchaseorder/model/PurchaseOrderModel";
import { PurchaseOrderItemModel } from "../checkout/purchaseorder/model/PurchaseOrderItemModel";
import { SaleOrderModel } from "../checkout/salesOrder/model/SaleOrderModel";
import { SaleOrderItemModel } from "../checkout/salesOrder/model/SaleOrderItemModel";

export default class SequelizePostgres{
    private static sequelize:Sequelize|undefined;

    private constructor(){}

    public static async getInstance():Promise<Sequelize>{
        try {
                SequelizePostgres.sequelize=new Sequelize({
                    database:process.env.DB_POSTGRES_NAME,
                    username:process.env.DB_POSTGRES_USERNAME,
                    password:process.env.DB_POSTGRES_PASSWORD,
                    host:process.env.DB_POSTGRES_HOST,
                    dialect: 'postgres',
                    port:Number(process.env.DB_POSTGRES_PORT) || 5432,
                    logging:false,
                })
                
                SequelizePostgres.sequelize.addModels([
                CustomerModel,AddressModel,
                SupplierModel,EmployeeModel,
                ProductModel,PurchaseOrderModel,
                PurchaseOrderItemModel,
                SaleOrderModel,SaleOrderItemModel])
                
                await SequelizePostgres.sequelize.sync();
                return SequelizePostgres.sequelize;
        } catch (error) {
            
            throw new Error("error when connecting to postgres database!"+error)
        }
    }
}