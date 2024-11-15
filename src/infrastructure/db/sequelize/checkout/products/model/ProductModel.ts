import { BeforeUpdate, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import CategoryModel from '../category/model/CategoryModel';


@Table({
    tableName:"Products",
    timestamps:false,
    version:true
    
})
export default class ProductModel extends Model{
    @PrimaryKey
    @Column
    declare id:string;

    @Column({allowNull:false,unique:true})
    declare name:string;

    @Column({allowNull:false})
    declare price:number;

    @Column({allowNull:false})
    declare quantity:number;
    
    @Column({
        allowNull: false,
        defaultValue: 0,
        type: DataType.INTEGER
    })
    declare version: number; 

    @ForeignKey(()=>CategoryModel) 
    declare category_id:string;

    @BelongsTo(()=>CategoryModel)
    declare category:CategoryModel;

    @BeforeUpdate
    static incrementVersion(product:ProductModel){
        product.version = product.version + 1;
    }
}