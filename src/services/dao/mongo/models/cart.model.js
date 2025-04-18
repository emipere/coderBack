import { Schema, model } from "mongoose";
const cartSchema = new Schema({
 products: {
  type: [
   {
    id_prod: {
     type: Schema.Types.ObjectId,
     ref: "products",
    },
    quantity: {
     type: Number,
     default: 1,
    },
   },
  ],
  default: [],
 },
});

cartSchema.pre("find", function () {
 this.populate("products.id_prod");
});

const cartModel = model("carts", cartSchema);
export default cartModel;