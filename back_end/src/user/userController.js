import { findAllDBService, createUserDBService, updateUserDBService, deleteUserDBService, findByIdDBService, generatePDFReport } from './userService.js';

export const findAllUserController = async (req, res) => {
    try {
        const users = await findAllDBService();
        res.send(users);
    } catch (error) {
        res.status(500).send({ status: false, message: "Error retrieving users", error: error.message });
    }
};

export const findByIdUserController = async (req, res) => {
    try {
        const user = await findByIdDBService(req.params.id);
        if (!user) {
            return res.status(404).send({ status: false, message: "No user found for id: " + req.params.id });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ status: false, message: "Error retrieving user", error: error.message });
    }
};

export const createUserController = async (req, res) => {
    try {
        const status = await createUserDBService(req.body);
        if (status) {
            res.status(201).send({ status: true, message: "User created successfully" });
        } else {
            res.status(400).send({ status: false, message: "Error creating user" });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: "Internal server error", error: error.message });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const status = await updateUserDBService(req.params.id, req.body);
        if (status) {
            res.send({ status: true, message: "User updated successfully" });
        } else {
            res.status(404).send({ status: false, message: "User not found for update" });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: "Error updating user", error: error.message });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const status = await deleteUserDBService(req.params.id);
        if (status) {
            res.send({ status: true, message: "User deleted successfully" });
        } else {
            res.status(404).send({ status: false, message: "User not found for deletion" });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: "Error deleting user", error: error.message });
    }
};

export const generatePDFReportController = async (req, res) => {
    try {
        const camp = req.params.camp;
        await generatePDFReport(camp, res);
    } catch (error) {
        res.status(500).send({ status: false, message: "Error generating PDF report", error: error.message });
    }
};