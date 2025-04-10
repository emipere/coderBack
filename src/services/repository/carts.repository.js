export default class CartsRepository {
    #dao
    constructor(dao) {
       this.#dao = dao;
    };
    getCarts = async () => {
        return this.#dao.getCarts();
    };
    getCartById = async (cid) => {
        return this.#dao.getCartById(cid);
    };
    createCart = async (cart) => {
        return this.#dao.createCart(cart);
    };
    insertProductCart = async (cid, pid) => {
       return this.#dao.insertProductCart(cid, pid);
    };
    updateProductsCart = async (cartId, product) => {
        return this.#dao.updateProductsCart(cartId, product);
    };
    updateQuantityProductCart = async (cartId, productId) => {
       return this.#dao.updateQuantityProductCart(cartId, productId);
    }
    deleteProductCart = async (cartId , productId) => {
        return this.#dao.deleteProductCart(cartId , productId);
    };
    deletecart = async (cartId) => {
        return this.#dao.deletecart(cartId);
    };
    generateTicketOrder = async (amount, purchaser) => {
        return this.#dao.generateTicketOrder(amount, purchaser);
    };
};