import path from 'path';
process.env.NODE_CONFIG_DIR = path.resolve('src', 'config');
import config from 'config';
import { Dialect, OperatorsAliases } from 'sequelize/types';

class SettingsProvider {
  getDatabaseSettings(): DatabaseSettings {
    return process.env.NODE_ENV === 'development'
      ? config.get('development')
      : config.get('production');
  }
}

export const settingsProvider = new SettingsProvider();

interface DatabaseSettings {
  dialectOptions: object | undefined;
  operatorsAliases: OperatorsAliases | undefined;
  dialect: Dialect;
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  CLIENT_URL: string;
  SERVER_URL: string;
}
