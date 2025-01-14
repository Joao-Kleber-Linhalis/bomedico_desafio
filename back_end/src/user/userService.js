import userModel from './userModel.js';

export async function getDataFromDBService() {
    try {
        const users = await userModel.find({});
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export async function findByIdDBService(id) {
    try {
        const user = await userModel.findById(id);
        return user;
    } catch (error) {
        console.error('Error finding user for id: ' + id, error);
        return false;
    }
}

export async function createUserDBService(userDetails) {
    try {
        const userModelData = new userModel({
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            state: userDetails.state,
            city: userDetails.city,
            email: userDetails.email,
            phone: userDetails.phone,
        });

        await userModelData.save();
        return true; // Sucesso
    } catch (error) {
        console.error('Error saving user:', error);
        return false; // Falha
    }
}

export async function updateUserDBService(id, userDetails) {
    try {
        userDetails.id = id;
        await userModel.findByIdAndUpdate(id, userDetails);
        return true;
    } catch (error) {
        console.error('Error updating user:', error);
        return false; // Falha
    }
}
export async function deleteUserDBService(id) {
    try {
        console.log(id);
        await userModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false; // Falha
    }
}