import { BelongsTo, Column, DataType, ForeignKey, HasMany, Min, Model, PrimaryKey, Table } from "sequelize-typescript";
import { SaleOrderItemModel } from "./SaleOrderItemModel";
import CustomerModel from "../../../customer/model/CustomerModel";
import EmployeeModel from "../../../employee/model/EmployeeModel";

@Table({
    tableName:"SaleOrder",
    timestamps:true
})
export class SaleOrderModel extends Model{

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
    
    @Column({
        allowNull: false,
        type: DataType.DATE,
        validate: { isDate: true },
      })
    declare date:Date;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
        validate: { min: 0 }
    })
    declare total:number;

    @HasMany(()=>SaleOrderItemModel)
    declare items:SaleOrderItemModel[];

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
        validate: { min: 0 }
    })
    declare discount:number;
}