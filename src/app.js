const express = require('express');
const cors = require("cors");

const hostname = '0.0.0.0';
const port = 3000;

const server = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/apinode');

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(cors());


const userRoute = require('./routes/userRoute');
userRoute(server);

const postRoute = require('./routes/postRoute');
postRoute(server);

const commentRoute = require('./routes/commentRoute');
commentRoute(server);

server.listen(port, hostname, () => {
    console.log(`The server is started on ${hostname}:${port}.`);
});