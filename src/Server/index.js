const express = require('express')
const app = express();
const port = process.env.PORT || 3001;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// const cors = require("cors");



app.get('/', (req, res) => res.send('Hello World!'))

io.on('connection', function(socket){
    console.log('user connected')
    socket.on('chat message', function(msg){
        console.log('message: ' + JSON.stringify(msg));
        io.emit('chat message', msg);
    })
})

http.listen(process.env.PORT || 3001, () => console.log(`Chatroom listening on port ${port}!`))

