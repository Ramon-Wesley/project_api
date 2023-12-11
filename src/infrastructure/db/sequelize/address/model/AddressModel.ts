import { Model,Table,Column,PrimaryKey, ForeignKey, BelongsTo, AutoIncrement } from "sequelize-typescript";
import CustomerModel from "../../customer/model/CustomerModel";

@Table({
    tableName:"address",
    timestamps:false
})

export default class AddressModel extends Model{
 
    @Column({allowNull:false})
    declare uf:string;
    
    @Column({allowNull:false})
    declare city:string;
    
    @Column({allowNull:false})
    declare neighborhood:string;
    
    @Column({allowNull:false})
    declare zipCode:string;
    
    @Column({allowNull:false})
    declare street:string;
    
    @Column({allowNull:false})
    declare number:string;
    
    @Column
    declare description:string;

   

}