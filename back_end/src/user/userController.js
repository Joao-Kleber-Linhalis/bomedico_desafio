import { getDataFromDBService, createUserDBService, updateUserDBService, deleteUserDBService, findByIdDBService } from './userService.js';

export const getDataUserController = async (req, res) => {
    const users = await getDataFromDBService();
    res.send({ "status": true, "data": users });
};

export const findByIdUserController = async (req, res) => {
    const user = await findByIdDBService(req.params.id);
    if (user === false) {
        res.send({ "status": false, "message": "No user find for id: " + req.params.id });
    }
    res.send({ "status": true, "data": user });
};

export const createUserController = async (req, res) => {
    const status = await createUserDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "User created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
};

export const updateUserController = async (req, res) => {
    var status = await updateUserDBService(req.params.id, req.body);
    if (status) {
        res.send({ "status": true, "message": "User updated" });
    } else {
        res.send({ "status": false, "message": "Error updating user" });
    }
}
export const deleteUserController = async (req, res) => {
    var status = await deleteUserDBService(req.params.id);
    if (status) {
        res.send({ "status": true, "message": "User deleted" });
    } else {
        res.send({ "status": false, "message": "Error deleting user" });
    }
}