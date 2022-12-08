import { Sequelize, Model, DataTypes } from 'sequelize';

export interface AppointmentsAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface AppointmentsCreationAttributes extends Omit<AppointmentsAttributes, 'id'> {}

export class AppointmentsEntity
  extends Model<AppointmentsAttributes, AppointmentsCreationAttributes>
  implements AppointmentsAttributes
{
  id!: number;
  name!: string;
  price!: number;
  description!: string;
  image!: string;
}

export const init = (sequelize: Sequelize) => {
  AppointmentsEntity.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'Appointments',
      sequelize,
      schema: process.env.DB_SCHEMA,
    },
  );
};
