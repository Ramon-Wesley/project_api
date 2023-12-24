import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import SchedulingServicesModel from "../../schedulingServices/model/SchedulingServicesModel";
import CustomerModel from "../../../customer/model/CustomerModel";
import AnimalModel from "../../animal/model/AnimalModel";
import EmployeeModel from "../../../employee/model/EmployeeModel";
import AppointmentBookingSchedulingService from "./AppointmentBookingSchedulingServiceModel";

@Table({
    tableName:"appointmentBooking",
    timestamps:false
})
export default class AppointmentBookingModel extends Model{

    @PrimaryKey
    @Column
    declare id:string;

    @ForeignKey(()=>CustomerModel)
    @Column({
        allowNull:false
    })
    declare customer_id:string;

    @BelongsTo(()=>CustomerModel)
    declare customer:CustomerModel;

    @ForeignKey(()=>AnimalModel)
    @Column({
        allowNull:false
    })
    declare animal_id:string;

    @BelongsTo(()=>AnimalModel)
    declare animal:AnimalModel;

    @ForeignKey(()=>EmployeeModel)
    @Column({
        allowNull:false
    })
    declare employee_id:string;

    @BelongsTo(()=>EmployeeModel)
    declare employee:EmployeeModel;

    @Column({
        allowNull:false
    })
    declare date:Date;
    
   
    @BelongsToMany(() => SchedulingServicesModel, () => AppointmentBookingSchedulingService)
    declare schedulingServices: SchedulingServicesModel[];
 
    @Column({
        allowNull:false
    })
    declare total:number;
}