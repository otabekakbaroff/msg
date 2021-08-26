const cors=require('cors');

const express = require('express');

const server = express();

const helmet=require('helmet');

const users=require('./users/router');


server.use(
    cors({
        origin: "*"
    })
);

server.use(helmet());

server.use(express.json());



server.use('/api/users', users);



server.get('/', (req,res)=>{
    res.json({ Message:`*** SERVER IS UP AND RUNNING ***` })
})


module.exports = server;
