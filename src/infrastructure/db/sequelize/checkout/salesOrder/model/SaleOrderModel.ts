import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { SaleOrderItemModel } from "./SaleOrderItemModel";
import SupplierModel from "../../../supplier/model/SupplierModel";
import EmployeeModel from "../../../employee/model/EmployeeModel";

@Table({
    tableName:"SaleOrder",
    timestamps:false
})
export class SaleOrderModel extends Model{

    @PrimaryKey
    @Column
    declare id:string;

    @ForeignKey(()=>SupplierModel)
    @Column({allowNull:false})
    declare supplier_id:string;
   
    @BelongsTo(()=>SupplierModel)
    declare supplier:SupplierModel;

    
    @ForeignKey(()=>EmployeeModel)
    declare employee_id:string;
    
    @BelongsTo(()=>EmployeeModel)
    declare employee:EmployeeModel;
    
    @Column({allowNull:false})
    declare date:Date;

    @Column({allowNull:false})
    declare total:number;

    @HasMany(()=>SaleOrderItemModel)
    declare items:SaleOrderItemModel[];

    @Column({allowNull:false})
    declare discount:number;
}