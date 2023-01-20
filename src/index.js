import http from "http";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
//config
import { PORT } from "./config/index.js";

const app = express();

const server = http.createServer(app);
const io = new SocketServer(server);

app.use(morgan("dev"));
app.use(cors());

app.listen(PORT, () => {
  console.log(`app listening in port: ${PORT}`);
});
