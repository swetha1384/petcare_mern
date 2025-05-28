const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    imageUrl: String,
    pet_variety: String,
    description: String,
    price: String
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
