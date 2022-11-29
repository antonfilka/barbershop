import { Sequelize, Model, DataTypes } from 'sequelize';

export interface UserAttributes {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  dateOfBirth?: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export class UserEntity
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number;
  name!: string;
  surname!: string;
  email!: string;
  password!: string;
  dateOfBirth!: Date;
}

export const init = (sequelize: Sequelize) => {
  UserEntity.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'Users',
      sequelize,
      schema: process.env.DB_SCHEMA,
    },
  );
};
