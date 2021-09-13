require('dotenv').config({ path: './configurations/.env' });
const http = require('http');

const app = require('./app');

const createServer = http.createServer(app);

const server = createServer.listen(process.env.PORT, () => {
  console.log(`Server is listening on PORT ${process.env.PORT}`);
});

// Socket
const io = require('socket.io')(server);

const socketConected = new Set();

io.on('connection', onConnection)

function onConnection(socket) {
  console.log(socket.id)
  socketConected.add(socket.id)

  io.emit('clients-total', socketConected.size)

  socket.on('disconnect', () => {
    console.log('Socket disconnected ', socket.id)
    socketConected.delete(socket.id)
    io.emit('clients-total', socketConected.size)
  })

  socket.on('message', (data) => {
    console.log(data)
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })
}