import express from 'express';
import { getDataController, createUserController, updateUserController } from '../src/user/userController.js';

const router = express.Router();

router.route('/user/getAll').get(getDataController);
router.route('/user/create').post(createUserController);
router.route('/user/update/:id').put(updateUserController);

export default router;