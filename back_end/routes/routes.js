import express from 'express';
import { getDataControllerFn, createUserControllerFn } from '../src/user/userController.js';

const router = express.Router();

router.route('/user/getAll').get(getDataControllerFn);
router.route('/user/create').post(createUserControllerFn);

export default router;