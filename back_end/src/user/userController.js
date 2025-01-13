import { getDataFromDBService } from './userService';

var getDataControllerFn = async (req, res) => {

    var employee = await getDataFromDBService();
    res.send({ "status": true, "data": employee });
}