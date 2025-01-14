import { getDataFromDBService, createUserDBService, updateUserDBService } from './userService.js';

export const getDataController = async (req, res) => {
    const employee = await getDataFromDBService();
    res.send({ "status": true, "data": employee });
};

export const createUserController = async (req, res) => {
    const status = await createUserDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "User created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
};

export const updateUserController = async (req,res) =>{
    var status = await updateUserDBService(req.params.id,req.body);
    if (status) {
        res.send({ "status": true, "message": "User updated" });
    } else {
        res.send({ "status": false, "message": "Error updating user" });
    }
}