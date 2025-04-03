import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import productRouter from "./routes/productos.routes.js";
import cartRouter from "./routes/carritos.routes.js";
import multerRouter from "./routes/imagenes.routes.js";
import path from "path";
import chatRouter from "./routes/chat.routes.js";

import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersViewRouter from "./routes/users.views.router.js";
import dotenv from "dotenv";
import githubLoginViewRouter from "./routes/github-login.views.router.js";
import petsRouter from './routes/pets.router.js';
import UsersExtendRouter from "./routes/custom/user.extend.router.js";
import config from "./config/config.js";
import processRouter from "./routes/procces.js";


const app = express();

// dotenv.config();


const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log("Server on port", PORT);
});

await mongoose
  .connect(config.mongoUrl)
  .then(() => console.log("BDD conectada"))
  .catch((e) => console.log("Error al conectar con bdd: ", e));

const urlMongo = process.env.MONGO_URL;
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: urlMongo,
      //  mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60,
    }),
    secret: "coderS3cr3t",
    resave: false,
    saveUninitialized: true,
  })
);

const io = new Server(server);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use(cookieParser("CoderS3cr3tC0d3"));

initializePassport();
app.use(passport.initialize());

app.use("/public", express.static(__dirname + "/public"));

app.use("/users", usersViewRouter);

app.use("/api/sessions", sessionsRouter);

app.use("/github", githubLoginViewRouter);

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use("/api/chat", chatRouter);

app.use("/upload", multerRouter);

app.use("/api/pets", petsRouter); // <- Es donde vamos a usar las Regex

// process
app.use("/", processRouter);

const usersExtendRouter = new UsersExtendRouter(); // creamos la instacia
app.use("/api/extend/users", usersExtendRouter.getRouter()); // <- Agregamos las rutas extendidas


app.get("/", (req, res) => {
  res.status(200).send("Ok se conecto perfecto");
});

let mensajes = [];
io.on("connection", (socket) => {
  console.log("user conectado:", socket.id);

  socket.on("mensaje", (data) => {
    console.log("mensaje recibido", data);
    mensajes.push(data);
    socket.emit("respuesta", mensajes);
  });

  socket.on("disconnect", () => {
    console.log("usuario desconectado:", socket.io);
  });
});
