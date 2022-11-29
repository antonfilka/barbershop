import express from 'express';
import { schemaValidator } from '../../middlewares';
import controller from '../users/controller';
import schema from '../users/schema';

const router = express.Router();

router.post('/sign-up', schemaValidator(schema.createUser), controller.createUser);
router.post('/sign-in', schemaValidator(schema.loginUser), controller.loginUser);
router.post('/logout', controller.logoutUser);
router.get('/refresh', controller.refreshUserToken);

export default router;
