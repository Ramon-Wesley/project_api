import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import UserModel from "../../user/model/UserModel";

@Table({ tableName: "refresh_tokens", timestamps: true })
export class RefreshTokenModel extends Model {


    @Column({
        allowNull: false
    })
    declare token: string;


    @BelongsTo(() => UserModel, {
        foreignKey: 'user_id', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user?: UserModel;  

}
