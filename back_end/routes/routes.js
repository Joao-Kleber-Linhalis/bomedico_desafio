import express from 'express';
import { findAllUserController, createUserController, updateUserController, deleteUserController, findByIdUserController, generatePDFReportController } from '../src/user/userController.js';

const router = express.Router();

router.route('/user/findAll').get(findAllUserController);
router.route('/user/find/:id').get(findByIdUserController);
router.route('/user/create').post(createUserController);
router.route('/user/update/:id').put(updateUserController);
router.route('/user/delete/:id').delete(deleteUserController);
router.route('/user/report/:camp').get(generatePDFReportController)
export default router;