const {Schema, model, Types} = require('mongoose');
const Product = require("./product.model")
const Size = require('./size.model');

const Cart = new Schema({
    user: {type: Types.ObjectId, ref: 'User', required: true},
    items: {
        product: {type: Types.ObjectId, ref: 'Product', required: true},
        quantity: {
            type: 'Number',
            required: true,
            min: [1, 'Quantity must be at least 1'],
            max: [100, 'Quantity must be less than or equal to 100']
        },
        price: {
            type: 'Number',
            required: true,
            min: [0, 'Price must be at least 0']
        },
        size: {
            type: 'String',
            required: true,
            minlength: [1, 'Size must be at least 1 character'],
            maxlength: [50, 'Size must be less than or equal to 50 characters']
        },
    },
    createdAt: {type: 'Date', required: true, default: Date.now()},
    updatedAt: {type: 'Date', required: true, default: Date.now()},
}, {timestamps: true});

module.exports = model('Cart', Cart);
