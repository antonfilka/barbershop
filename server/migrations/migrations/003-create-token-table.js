'use strict';

const { withTransaction } = require('../utils');

const TABLE_NAME = 'RefreshToken';
const DB_SCHEMA = process.env.DB_SCHEMA;
const target = { tableName: TABLE_NAME, schema: DB_SCHEMA };

module.exports = {
  up: withTransaction((queryInterface, DataTypes, transaction) =>
    Promise.all([
      queryInterface.createTable(
        target,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.literal('uuid_generate_v4()'),
            primaryKey: true,
          },
          userId: {
            type: DataTypes.UUID,
          },
          refreshToken: {
            type: DataTypes.STRING,
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
        },
        { transaction },
      ),
    ]),
  ),
  down: withTransaction((queryInterface) => queryInterface.dropTable(target)),
};
