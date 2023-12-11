import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import ProductModel from '../../products/model/ProductModel';
import { SaleOrderModel } from './SaleOrderModel';


@Table({
    tableName:"SaleOrderItem",
    timestamps:false
    
})
export class SaleOrderItemModel extends Model{

    @PrimaryKey
    @Column
    declare id:string;

    @ForeignKey(()=>ProductModel)
    @Column({allowNull:false})
    declare product_id:string;
    
    @BelongsTo(()=>ProductModel)
    declare product:ProductModel;

    @ForeignKey(()=>SaleOrderModel)
    @Column({allowNull:false})
    declare order_id:string;

    @BelongsTo(()=>SaleOrderModel)
    declare order:SaleOrderModel;
    
    @Column({allowNull:false})
    declare quantity:number;
    
    @Column({allowNull:false})
    declare price:number;
    
    @Column({allowNull:false})
    declare total:number;


}