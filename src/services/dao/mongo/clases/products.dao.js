import productModel from "../models/product.model.js";

export default class ProductsService {
    constructor() {
        console.log("Calling pets model using a service.");
    };
    getProducts = async () => {
        const products = await productModel.find();
        return products.map(product => product.toObject());
    };
    getProductById = async (id) => {
        const result = await productModel.findOne({ _id: id });
        return result;
    };
    createProduct = async (product) => {
        const result = await productModel.create(product);
        return result;
    };
    updateProduct = async (id,product) => {
        const result = await productModel.updateOne({ _id: id },product);
        return result;
    };
    deleteProduct = async (id) => {
        const result = await productModel.deleteOne ({ _id: id });
        return result;
    }
};