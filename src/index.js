import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 8000;

const start = () => {
  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  app.use(cors());

  app.get('/', (_request, response) => {
    response.send('Hi, stranger! Yes, this server is running. 😃');
  });

  server.listen(PORT, () => {
    console.log(`👂 Server listening on port: ${PORT} 👂`);
  });

  setupIo(io);
}

const setupIo = (io) => {
  io.on('connection', (socket) => {
    socket.emit('user_id', socket.id);

    socket.on('disconnect', () => {
      socket.broadcast.emit('call_ended');
    });

    socket.on('call_user', ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit('call_user', { signal: signalData, from, name });
    });

    socket.on('answer_call', (data) => {
      io.to(data.to).emit('call_accepted', data.signal);
    });
  });
}

start();