import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import CategoryModel from '../category/model/CategoryModel';


@Table({
    tableName:"Products",
    timestamps:false
    
})
export default class ProductModel extends Model{
    @PrimaryKey
    @Column
    declare id:string;

    @Column({allowNull:false})
    declare name:string;

    @Column({allowNull:false})
    declare price:number;

    @Column({allowNull:false})
    declare quantity:number;

    @ForeignKey(()=>CategoryModel) 
    declare category_id:string;

    @BelongsTo(()=>CategoryModel)
    declare category:CategoryModel;
}