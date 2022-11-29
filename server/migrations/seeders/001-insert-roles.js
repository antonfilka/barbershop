'use strict';

const DB_SCHEMA = process.env.DB_SCHEMA;
const TABLE_ROLES = 'Roles';
const targetRoles = { tableName: TABLE_ROLES, schema: DB_SCHEMA };

const TABLE_USERS = 'Users';
const targetUsers = { tableName: TABLE_USERS, schema: DB_SCHEMA };

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(targetRoles, [
      { id: 1, role: 'admin' },
      { id: 2, role: 'manager' },
      { id: 3, role: 'employee' },
      { id: 4, role: 'top' },
      { id: 5, role: 'ceo' },
    ]);
    await queryInterface.addConstraint(targetUsers, {
      fields: ['roleId'],
      type: 'foreign key',
      name: 'relationRole',
      references: {
        table: targetRoles,
        field: 'id',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(targetUsers, 'relationRole', {});
    await queryInterface.bulkDelete(targetRoles, null, {});
  },
};
