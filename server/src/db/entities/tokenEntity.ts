import { Sequelize, Model, DataTypes } from 'sequelize';

export interface TokenAttributes {
  id: number;
  userId: number;
  refreshToken: string;
}

export interface TokenCreationAttributes extends Omit<TokenAttributes, 'id'> {}

export class TokenEntity
  extends Model<TokenAttributes, TokenCreationAttributes>
  implements TokenAttributes
{
  id!: number;
  userId!: number;
  refreshToken!: string;
}

export const init = (sequelize: Sequelize) => {
  TokenEntity.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUIDV4,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'RefreshToken',
      sequelize,
      schema: process.env.DB_SCHEMA,
    },
  );
};
