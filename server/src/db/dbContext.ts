import { Sequelize } from 'sequelize';
import { settingsProvider } from '../utils/settingsProvider';
import { InitEntities } from './initEntities';

class DbContext {
  private _sequelize: Sequelize;

  constructor() {
    const settings = settingsProvider.getDatabaseSettings();
    this._sequelize = new Sequelize(settings.database, settings.username, settings.password, {
      host: settings.host,
      port: settings.port,
      dialect: settings.dialect,
      logging: false,
      operatorsAliases: settings.operatorsAliases,
      dialectOptions: { ...settings.dialectOptions },
    });
    InitEntities.init(this._sequelize);
  }

  public async connect(): Promise<void> {
    await this._sequelize.authenticate();
  }

  public async disconnect(): Promise<void> {
    await this._sequelize.close();
  }

  public async transaction() {
    return await this._sequelize.transaction();
  }
}

export const dbContext = new DbContext();
