const cors=require('cors');

const express = require('express');

const server = express();

const helmet=require('helmet');

const users=require('./users/router');



server.use(express.json());

server.use(cors());

server.use(helmet());

server.use('/api/users', users);



server.get('/', (req,res)=>{
    res.json({ Message:`*** SERVER IS UP AND RUNNING ***` })
})


module.exports = server;
