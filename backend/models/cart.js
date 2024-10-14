const mongoose = require('mongoose');
const {Schema} = mongoose
const cartSchema = new Schema({
    id: { type: String,  unique: true},
    product: { type: String, unique: true},
    password: { type: String}
});

const CartModule = mongoose.model('Cart', cartSchema);

module.exports = CartModule;