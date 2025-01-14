import express from 'express';
import { getDataController, createUserController, updateUserController, deleteUserController } from '../src/user/userController.js';

const router = express.Router();

router.route('/user/getAll').get(getDataController);
router.route('/user/create').post(createUserController);
router.route('/user/update/:id').put(updateUserController);
router.route('/user/delete/:id').delete(deleteUserController);

export default router;