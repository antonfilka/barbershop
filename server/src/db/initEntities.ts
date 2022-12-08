import { Sequelize } from 'sequelize/types';
import { init as initUserEntity, UserEntity } from './entities/userEntity';
import { init as initTokenEntity } from './entities/tokenEntity';
import { AppointmentsEntity, init as initAppointmentsntity } from './entities/appointments';
import {
  init as initUsersAppointmentsntity,
  UsersAppointmentsEntity,
} from './entities/usersAppointments ';

export class InitEntities {
  static init(sequelize: Sequelize) {
    // models
    initUserEntity(sequelize);
    initTokenEntity(sequelize);
    initAppointmentsntity(sequelize);
    initUsersAppointmentsntity(sequelize);

    // relations

    UserEntity.hasMany(UsersAppointmentsEntity, { as: 'userAppointments', foreignKey: 'userId' });
    AppointmentsEntity.hasMany(UsersAppointmentsEntity, {
      as: 'userAppointments',
      foreignKey: 'appointmentId',
    });

    UsersAppointmentsEntity.belongsTo(UserEntity, { as: 'user', foreignKey: 'userId' });
    UsersAppointmentsEntity.belongsTo(AppointmentsEntity, {
      as: 'appointment',
      foreignKey: 'appointmentId',
    });
  }
}
