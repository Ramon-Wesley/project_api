import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"category",
    timestamps:false
})
export default class CategoryModel extends Model{

    @PrimaryKey
    @Column
    declare id:string;

    @Column({allowNull:false,unique:true})
    declare name:string;

    @Column({allowNull:false})
    declare description:string;

}