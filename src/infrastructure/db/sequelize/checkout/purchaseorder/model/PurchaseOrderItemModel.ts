import { BelongsTo, Column, DataType, ForeignKey, Min, Model, PrimaryKey, Table } from 'sequelize-typescript';
import ProductModel from '../../products/model/ProductModel';
import { PurchaseOrderModel } from './PurchaseOrderModel';


@Table({
    tableName:"PurchaseOrderItem",
    timestamps:true
    
})
export class  PurchaseOrderItemModel extends Model{

    @PrimaryKey
    @Column
    declare id:string;

    @ForeignKey(()=>ProductModel)
    @Column({allowNull:false})
    declare product_id:string;
    
    @BelongsTo(()=>ProductModel)
    declare product:ProductModel;

    @ForeignKey(()=>PurchaseOrderModel)
    @Column({allowNull:false})
    declare order_id:string;

    @BelongsTo(()=>PurchaseOrderModel)
    declare order:PurchaseOrderModel;
    
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
        validate: { min: 0 }
    })
    declare quantity: number;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
        validate: { min: 0 }
    })
    declare price: number;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
        validate: { min: 0 }
    })
    declare total: number;

}