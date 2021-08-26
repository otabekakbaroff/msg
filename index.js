require('dotenv').config();
const server = require('./server.js')
const http = require('http');
const { userInfo } = require('os');
const app = http.createServer(server);
const io = require('socket.io')(app,{
    cors:{
        origin:'*'
    }
})
const port = process.env.PORT;

let users = {}

io.on("connection", function(socket){
    console.log(`connected id: ${socket.id}`)
    socket.broadcast.emit('server-message', {message:"Successful connection"})
    socket.on('login', user_info=>{
        console.log(user_info)
        users = {...users, [user_info]:socket.id}
        console.log(users)
    })
    socket.on('private-message', message => {

        // socket.to(users.message.to || 'unavailble').emit(message)
        console.log(message)
        console.log(users)
    })
        
    
})














app.listen(port, console.log('Server running on port 5000'))