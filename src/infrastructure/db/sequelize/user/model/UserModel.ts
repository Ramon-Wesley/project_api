
import { AllowNull, Column, PrimaryKey, Table,Model, DataType, HasOne } from "sequelize-typescript";
import { Roles } from "../../../../../domain/users/@shared/Roles";
import { RefreshTokenModel } from "../../refreshToken/model/RefreshTokenModel";


@Table({
    tableName:"Users",
    timestamps:true
})
export default class UserModel extends Model{

    @PrimaryKey
    @Column
    declare id:string

    @Column({allowNull:false})
    declare name:string

    @Column({unique:true})
    declare email:string

    @Column({allowNull:false})
    declare password:string

    @Column({allowNull:false})
    declare isActive:boolean;

    @Column({ type: DataType.STRING, allowNull: true })
    declare roles:string 

    @HasOne(() => RefreshTokenModel, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    refreshToken?:RefreshTokenModel

    @Column
    createdAt?: Date;

    @Column
    updatedAt?: Date;

    }