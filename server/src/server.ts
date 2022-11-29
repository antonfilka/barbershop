import express, { Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import initRoutes from './routes';
import fileUpload from 'express-fileupload';
import { settingsProvider } from './utils/settingsProvider';

require('dotenv').config();

const app: Application = express();

const settings = settingsProvider.getDatabaseSettings();
// setup CORS
app.use(
  cors({
    credentials: true,
    origin: settings.CLIENT_URL,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}));

initRoutes(app);

const http = require('http');
const server = http.createServer(app);

export default server;
