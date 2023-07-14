const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

const users = {};
io.on('connection', socket => {
    socket.on('new-user-connected', name => {
        console.log('new user',name);
        users[socket.id] = name;
        console.log(users[socket.id]);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        console.log(users[socket.id])
        console.log(message);
        socket.broadcast.emit('receive', {message: message, user: users[socket.id]});
    })

    socket.on('disconnect', message=> {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]
    })

    // server.listen(8000, () => {
    //     console.log('Server running on port 8000');
    // });
})