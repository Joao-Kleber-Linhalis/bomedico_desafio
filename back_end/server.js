import express, { json } from 'express';
var server = express();

import mongoose from 'mongoose';

// mongoose.connect(, { userNewUrlParser: true, useUnifiedTopology: true }).then(function checkDB(error) {
//     if (error) {
//         console.log("error " + error);
//     }
//     else {
//         console.log("db connected ");
//     }
// })

mongoose.connect(
    "mongodb://localhost:27017/desafio_bomedico",
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    console.log("db connected")
})


server.use(json());

server.listen(8000, function check(error) {
    if (error) {
        console.log("error " + error);
    }
    else {
        console.log("server started");
    }
});

