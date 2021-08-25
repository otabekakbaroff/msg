
const express = require('express');


const server = express();



server.use(express.json());


server.get('/', (req,res)=>{
    res.json({ Message:`*** SERVER IS UP AND RUNNING ***` })
})


module.exports = server;
