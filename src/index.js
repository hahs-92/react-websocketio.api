import http from "http";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
//config
import { PORT } from "./config/index.js";

const app = express();

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

app.use(morgan("dev"));
app.use(cors());

// esta eschando eventos
io.on("connection", (socket) => {
  console.log("user connected¡ with id: " + socket.id);

  //recibimos un evento desde el cliente
  socket.on("message", (message) => {
    // emitimos un evento a todos los clientes
    socket.broadcast.emit("message", { body: message, from: socket.id });
  });
});

server.listen(PORT, () => {
  console.log(`app listening in port: ${PORT}`);
});
