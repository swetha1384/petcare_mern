const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    imageUrl: String,
    description: String,
    price: String
});

const CartModel = mongoose.model("cart", CartSchema);
module.exports = CartModel;