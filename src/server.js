import express from "express";
import mongoose from "mongoose";
import { create } from "express-handlebars";
import {Server} from "socket.io"; 
import { __dirname } from "./path.js";
import productRouter from "./routes/productos.routes.js";
import cartRouter from "./routes/carritos.routes.js";
import multerRouter from "./routes/imagenes.routes.js";
import path from "path"
import chatRouter from "./routes/chat.routes.js";

const app = express();
const hbs = create ();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log("Server on port", PORT);
});

await mongoose.connect("mongodb+srv://emipereiro:Salu1805@cluster0.avxgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  
//  mongodb+srv://emipereiro:Salu1805mongodbatlas@cluster0.defym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)

.then(() => console.log("BDD conectada"))
.catch((e) => console.log("Error al conectar con bdd: ", e))

const io = new Server(server);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');


app.set('views', path.join(__dirname, 'views'));

app.use("/public", express.static(__dirname + "/public"));
app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use("/api/chat", chatRouter);

app.use("/upload", multerRouter);


app.get('/', (req,res) => {
  res.status(200).send("Ok se conecto perfecto")
})

let mensajes = []
io.on("connection",(socket)=> {
  console.log("user conectado:" , socket.id);

  socket.on("mensaje",(data)=>{
    console.log("mensaje recibido" , data);
    mensajes.push(data) 
    socket.emit("respuesta", mensajes)
  })

  socket.on("disconnect" , ()=> {
    console.log("usuario desconectado:" , socket.io);
  })
})

