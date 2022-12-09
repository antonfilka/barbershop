import express from 'express';
import controller from '../users/controller';
import { schemaValidator } from '../../middlewares';
import schema from '../users/schema';

const router = express.Router();

router.post('/sign-up', schemaValidator(schema.createUser), controller.createUser);
router.post('/sign-in', schemaValidator(schema.loginUser), controller.loginUser);
router.post('/logout', controller.logoutUser);
router.get('/refresh', controller.refreshUserToken);
router.get('/appointments', controller.getAppointments);
router.post('/appointment', controller.createUserAppointment);
router.post('/my-appointments', controller.getMyAppointments);

export default router;
