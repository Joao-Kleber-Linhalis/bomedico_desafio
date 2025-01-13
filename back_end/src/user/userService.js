var userModel = require('./userModel');

export function getDataFromDBService() {

    return new Promise(function checkURL(resolve, reject) {

        userModel.find({}, function returnData(error, result) {
            if (error) {
                reject(false);
            }
            else {
                resolve(result);
            }
        })
    });
}