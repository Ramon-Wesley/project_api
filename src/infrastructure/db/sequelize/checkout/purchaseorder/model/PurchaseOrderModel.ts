import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { PurchaseOrderItemModel } from "./PurchaseOrderItemModel";
import CustomerModel from "../../../customer/model/CustomerModel";
import EmployeeModel from "../../../employee/model/EmployeeModel";

@Table({
    tableName:"PurchaseOrder",
    timestamps:false
})
export class PurchaseOrderModel extends Model{

    @PrimaryKey
    @Column
    declare id:string;

    @ForeignKey(()=>CustomerModel)
    @Column({allowNull:false})
    declare customer_id:string;
   
    @BelongsTo(()=>CustomerModel)
    declare customer:CustomerModel;

    
    @ForeignKey(()=>EmployeeModel)
    declare employee_id:string;
    
    @BelongsTo(()=>EmployeeModel)
    declare employee:EmployeeModel;
    
    @Column({allowNull:false})
    declare date:Date;

    @Column({allowNull:false})
    declare total:number;

    @HasMany(()=>PurchaseOrderItemModel)
    declare items:PurchaseOrderItemModel[];

    @Column({allowNull:false})
    declare discount:number;
}