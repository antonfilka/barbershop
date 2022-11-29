import { Sequelize } from 'sequelize/types';
import { init as initUserEntity } from './entities/userEntity';
import { init as initTokenEntity } from './entities/tokenEntity';

export class InitEntities {
  static init(sequelize: Sequelize) {
    // models
    initUserEntity(sequelize);
    initTokenEntity(sequelize);

    // relations
  }
}
