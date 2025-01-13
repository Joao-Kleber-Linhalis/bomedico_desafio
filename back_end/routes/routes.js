import express, { json } from 'express';

const router = express.Router();

router.route('/user/getAll').get(userController.getDataControllerfn);