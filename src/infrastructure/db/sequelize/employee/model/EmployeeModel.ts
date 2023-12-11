import { Model,Table,Column,PrimaryKey, HasOne, BelongsTo } from "sequelize-typescript";
import AddressModel from "../../address/model/AddressModel";

@Table({
    tableName:"Employees",
    timestamps:false
    
})
export default class EmployeeModel extends Model{

    @PrimaryKey
    @Column
    declare id:string
    
    @Column({allowNull:false})
    declare name:string;
    
    @Column({allowNull:false})
    declare ra:string;
    
    @Column({allowNull:false})
    declare email:string;
    
    @Column({allowNull:false})
    declare date_of_birth:Date;
    
    @BelongsTo(() => AddressModel, {
        foreignKey: 'address_id', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    declare address:AddressModel;
    
    @Column({allowNull:false})
    declare isActive:boolean;
 
}