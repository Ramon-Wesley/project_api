import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"schedulingServices",
    timestamps:false
})
export default class SchedulingServicesModel extends Model{

    @PrimaryKey
    @Column
    declare id:string;

    @Column({
        allowNull:false,
        unique:true
    })
    declare name:string;

    @Column({
        allowNull:false
    })
    declare price:number;

}