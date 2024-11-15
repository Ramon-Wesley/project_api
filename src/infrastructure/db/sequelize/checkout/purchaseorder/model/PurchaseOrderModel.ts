import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { PurchaseOrderItemModel } from "./PurchaseOrderItemModel";
import SupplierModel from "../../../supplier/model/SupplierModel";
import EmployeeModel from "../../../employee/model/EmployeeModel";

@Table({
    tableName:"PurchaseOrder",
    timestamps:true
})
export class PurchaseOrderModel extends Model{

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

    @HasMany(()=>PurchaseOrderItemModel)
    declare items:PurchaseOrderItemModel[];

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
        validate: { min: 0 }
    })
    declare discount:number;
}