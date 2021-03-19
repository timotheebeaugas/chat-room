const app = require('express')();
const http = require('http').createServer(app);


const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  })

io.on('connection', socket => {
    socket.on('log in', (username) => {
        io.emit('log in', username)
    })
    socket.on('disconnect', () => {
        io.emit('leave')
    })
    socket.on('log out', (username) => {
        io.emit('log out', username)
    })
    socket.on('message', ({name, avatar, message, date}) => { 
        io.emit('message', {name, avatar, message, date})
    })
});

http.listen(4000, function(){
    console.log('linstening on port 4000')
});  