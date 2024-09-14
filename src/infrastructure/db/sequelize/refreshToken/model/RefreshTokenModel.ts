import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import UserModel from "../../user/model/UserModel";

@Table({ tableName: "refresh_tokens", timestamps: true })
export class RefreshTokenModel extends Model {
    
    @PrimaryKey 
    @Column
    declare id: string;

    @Column({
        allowNull: false
    })
    declare expiresIn: string;

    @ForeignKey(() => UserModel)
    @Column({
        allowNull: false
    })
    declare user_id: string;

    @BelongsTo(() => UserModel, {
        foreignKey: 'user_id', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user?: UserModel;  

}
