import { Sequelize, Model, DataTypes } from 'sequelize';

export interface UsersAppointmentsAttributes {
  id: number;
  userId: number;
  appointmentId: number;
  date: Date;
}

export interface UsersAppointmentsCreationAttributes
  extends Omit<UsersAppointmentsAttributes, 'id'> {}

export class UsersAppointmentsEntity
  extends Model<UsersAppointmentsAttributes, UsersAppointmentsCreationAttributes>
  implements UsersAppointmentsAttributes
{
  id!: number;
  userId!: number;
  appointmentId!: number;
  date!: Date;
}

export const init = (sequelize: Sequelize) => {
  UsersAppointmentsEntity.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUIDV4,
      },
      appointmentId: {
        type: DataTypes.UUIDV4,
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'UsersAppointments',
      sequelize,
      schema: process.env.DB_SCHEMA,
    },
  );
};
