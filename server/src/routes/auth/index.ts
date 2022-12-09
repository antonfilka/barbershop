import express from 'express';
import controller from '../users/controller';

const router = express.Router();

router.post('/sign-up', controller.createUser);
router.post('/sign-in', controller.loginUser);
router.post('/logout', controller.logoutUser);
router.get('/refresh', controller.refreshUserToken);
router.get('/appointments', controller.getAppointments);
router.post('/appointment', controller.createUserAppointment);
router.post('/my-appointments', controller.getMyAppointments);

export default router;
