import { ProductsService } from "../services/services.js";

export const getProducts = async (req,res) => {
    try {
             
        const prods = await ProductsService.getProducts()
        console.log(prods);
        res.status(200).json({ status: "success", payload: prods })
        // res.status(200).render('templates/home', {productos: prods, js: 'productos.js', css: 'productos.css'})
        
    } catch(e) {
        res.status(500).send("Error al consultar productos: ", e)
    }
}
export const getProductById = async(req,res) => {
    try {
        const idProd = req.params.pid 
        const prod = await ProductsService.getProductById(idProd)
        if(prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto no existe")        
    }catch(e){
        res.status(500).send("Error al consultar producto: ", e)
    }
}
export const createProduct = async (req,res) => {
    try {
        const product = req.body
        const respuesta = await ProductsService.createProduct(product)
        console.log(respuesta);
        res.status(201).send("Producto creado correctamente")
    } catch(e) {
        console.log(e);
        
        res.status(500).send("Error al crear producto: ", e)
    }
}
export const updateProduct = async (req,res) => {
    try {
        const idProd = req.params.pid
        const updateProduct = req.body
        const respuesta = await ProductsService.updateProduct(idProd, updateProduct)
        res.status(200).send("Producto actualizado correctamente")
    } catch(e) {
        console.log(e);
        
        res.status(500).send("Error al actualizar producto: ", e)
    }
}
export const deleteProduct = async (req,res) => {
    try {
        const idProd = req.params.pid
        const respuesta = await ProductsService.deleteProduct(idProd)
        res.status(200).send("Producto eliminado correctamente")
    } catch(e) {
        res.status(500).send("Error al eliminar producto: ", e)
    }
}

