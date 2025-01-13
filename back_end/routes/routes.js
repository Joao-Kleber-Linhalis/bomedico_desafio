import express from 'express';
var userController = require('../src/user/userController');

const router = express.Router();

router.route('/user/getAll').get(userController.getDataControllerFn);