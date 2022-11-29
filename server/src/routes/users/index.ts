import express from 'express';
import { authMiddleware, schemaValidator } from '../../middlewares';
import controller from './controller';
import schema from './schema';

const router = express.Router();

router.get('/', authMiddleware, schemaValidator(schema.getUsers), controller.getUsers);
router.delete('/delete-user', authMiddleware, controller.deleteUser);

export default router;
