import { getDataFromDBService, createUserDBService } from './userService.js';

export const getDataControllerFn = async (req, res) => {
    const employee = await getDataFromDBService();
    res.send({ "status": true, "data": employee });
};

export const createUserControllerFn = async (req, res) => {
    const status = await createUserDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "User created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
};