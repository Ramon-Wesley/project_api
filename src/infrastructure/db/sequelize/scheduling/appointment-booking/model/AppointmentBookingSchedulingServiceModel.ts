import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table,
  } from "sequelize-typescript";
  import AppointmentBookingModel from "./AppointmentBookingModel";
  import SchedulingServicesModel from "../../schedulingServices/model/SchedulingServicesModel";
  
  @Table({
      tableName: "appointmentBookingSchedulingService",
      timestamps: false
  })
  export default class AppointmentBookingSchedulingService extends Model {
  
      @ForeignKey(() => AppointmentBookingModel)
      @Column({
          allowNull: false
      })
      declare appointmentBooking_id: string;
  
      @BelongsTo(() => AppointmentBookingModel)
      declare appointmentBooking: AppointmentBookingModel;
  
      @ForeignKey(() => SchedulingServicesModel)
      @Column({
          allowNull: false
      })
      declare schedulingService_id: string;
  
      @BelongsTo(() => SchedulingServicesModel)
      declare schedulingService: SchedulingServicesModel;
  }