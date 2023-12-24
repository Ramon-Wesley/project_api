import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "../../../customer/model/CustomerModel";
import RaceModel from "./RaceModel";

@Table({
    tableName:"animal",
    timestamps:false

})
export default class AnimalModel extends Model{

    @PrimaryKey
    @Column
    declare id:string
    
    @ForeignKey(()=>CustomerModel)
    @Column({allowNull:false})
    declare customer_id:string;

    @BelongsTo(()=>CustomerModel)
    declare customer:CustomerModel

    @Column({allowNull:false})
    declare name:string;

    @ForeignKey(()=>RaceModel)
    declare race_id:string;

    @BelongsTo(()=>RaceModel)
    declare race:RaceModel
    
    @Column({allowNull:false})
    declare weight:number;

    @Column({allowNull:false})
    declare date_of_birth:Date;

}