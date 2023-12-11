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

export default class SequelizeMemory{
    private static sequelize:Sequelize|undefined;

    private constructor(){}

    public static async getInstance():Promise<Sequelize>{
        try {
                SequelizeMemory.sequelize=new Sequelize({
                    dialect: 'sqlite',
                    storage: ':memory:',
                    logging:false,
                })
                
                SequelizeMemory.sequelize.addModels([
                CustomerModel,AddressModel,
                SupplierModel,EmployeeModel,
                ProductModel,PurchaseOrderModel,
                PurchaseOrderItemModel,
                SaleOrderModel,SaleOrderItemModel])
                
                await SequelizeMemory.sequelize.sync({ force: true });
                return SequelizeMemory.sequelize;
        } catch (error) {
            
            throw new Error("error when connecting to in-memory database!"+error)
        }
    }
}