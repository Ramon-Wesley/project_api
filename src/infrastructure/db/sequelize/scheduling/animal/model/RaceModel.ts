import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "../../../customer/model/CustomerModel";

@Table({
    tableName:"race",
    timestamps:false

})
export default class RaceModel extends Model{

    @PrimaryKey
    @Column
    declare id:string

    @Column({allowNull:false})
    declare name:string;

}