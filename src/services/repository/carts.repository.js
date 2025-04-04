export default class CartsRepository {

    #dao
    constructor(dao) {
       this.#dao = dao;
    };
    getCarts = async () => {
        return this.#dao.getCarts();
    };
    createCart = async (cart) => {
        return this.#dao.createCart(cart);
    };
    insertProductCar = async (cartId) => {
       return this.#dao.insertProductCar(cartId);
    };
    updateProductsCart = async (cartId, product) => {
        return this.#dao.updateProductsCart(cartId, product);
    };
    updateQuantityProductCart = async (cartId, productId) => {
       return this.#dao.updateQuantityProductCart(cartId, productId);
    }
    deleteProductCart = async (cartId , productId) => {
        return this.#dao.deleteProductCart(cartId , productId);
     }
    deletecart = async (cartId) => {
        return this.#dao.deletecart(cartId);
     }
}