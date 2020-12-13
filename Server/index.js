const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const http = require('http');
const socketio = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./ChatRoom/users');
const router = require('./ChatRoom/router');


const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(cors());
app.use(router);

// --------------------------------------ChatRoom-----------------------------
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});
// ----------------------------------------------

const PORT = process.env.PORT || 5000;

app.use('/uploads', express.static('uploads'));

//Utils
const uploadData = require('./routes/uploadData')
app.use('/api',uploadData);

//Student Routes
const studentRoute = require('./routes/student/studentUser.route')

app.use('/student', studentRoute)

//Faculty Routes
const facultyRoute = require('./routes/faculty/facultyUser.route')

app.use('/faculty', facultyRoute);

app.use('/forum',require('./routes/Forum/forum'))



app.listen(PORT, () => console.log(`The Server has started on port ${PORT}.`));
server.listen(8000, () => console.log(`Server has started.`));

// MONGO_URI='mongodb://localhost:27017/E-Learn'
// JWT_SECRET='6T\Ecj,-z@phUer4,M5?#<9_t46^#c'
mongoose
  .connect('mongodb://localhost:27017/E-Learn', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB started.');
  })
  .catch((err) => {
    console.log(err);
  });
