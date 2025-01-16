import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js';

const server = express();

mongoose.connect(
    "mongodb://localhost:27017/desafio_bomedico",
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    console.log("db connected")
})


server.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
server.use(json());
server.use(routes);


server.listen(8000, function check(error) {
    if (error) {
        console.log("error " + error);
    }
    else {
        console.log("server started");
    }
});

