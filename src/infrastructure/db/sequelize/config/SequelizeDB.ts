import {Sequelize} from "sequelize-typescript"
import dotenv from "dotenv"
import AddressModel from "../address/model/AddressModel"
import CustomerModel from "../customer/model/CustomerModel"
import SupplierModel from "../supplier/model/SupplierModel";
import EmployeeModel from "../employee/model/EmployeeModel";
import ProductModel from "../checkout/products/model/ProductModel";
import { PurchaseOrderModel } from "../checkout/purchaseorder/model/PurchaseOrderModel";
import { PurchaseOrderItemModel } from "../checkout/purchaseorder/model/PurchaseOrderItemModel";
import { SaleOrderModel } from "../checkout/salesOrder/model/SaleOrderModel";
import { SaleOrderItemModel } from "../checkout/salesOrder/model/SaleOrderItemModel";
import { Dialect } from "sequelize";
import RaceModel from "../scheduling/animal/model/RaceModel";
import AnimalModel from "../scheduling/animal/model/AnimalModel";
import SchedulingServicesModel from "../scheduling/schedulingServices/model/SchedulingServicesModel";
import AppointmentBookingModel from "../scheduling/appointment-booking/model/AppointmentBookingModel";
import AppointmentBookingSchedulingService from "../scheduling/appointment-booking/model/AppointmentBookingSchedulingServiceModel";

export default class SequelizeDb{
    private static sequelize:Sequelize|undefined;

    private constructor(){}

    public static async getInstance():Promise<Sequelize>{
        try {

                SequelizeDb.sequelize=new Sequelize({
                    database:process.env.DB_NAME,
                    username:process.env.DB_USERNAME,
                    password:process.env.DB_PASSWORD,
                    storage:process.env.DB === "sqlite"?":memory:":"",
                    host:process.env.DB_HOST,
                    dialect: process.env.DB as Dialect || "sqlite",
                    port:Number(process.env.DB_PORT),
                    logging:false,
                })
                SequelizeDb.sequelize.addModels([
                    CustomerModel,AddressModel,
                    SupplierModel,EmployeeModel,
                    ProductModel,PurchaseOrderModel,
                    PurchaseOrderItemModel,
                    SaleOrderModel,SaleOrderItemModel,
                    RaceModel,AnimalModel,
                    SchedulingServicesModel,AppointmentBookingModel,AppointmentBookingSchedulingService
                ])
               
                return await SequelizeDb.sequelize.sync();
                
        } catch (error) {
            
            throw new Error(`error when connecting to ${process.env.DB} database!`+error)
        }
    }
}