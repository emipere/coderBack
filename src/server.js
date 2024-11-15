import express from "express";
import { __dirname } from "./path.js";
import productRouter from "./routes/productos.routes.js";
import cartRouter from "./routes/carritos.routes.js";
import multerRouter from "./routes/imagenes.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/public"));

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use("/upload", multerRouter);

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});
