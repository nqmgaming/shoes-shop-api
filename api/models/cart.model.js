const {Schema, model, Types} = require('mongoose');
const Cart = new Schema({
        user: { type: Types.ObjectId, ref: 'User', required: true },
        items: {
            product: { type: Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: 'Number', required: true },
            price: { type: 'Number', required: true },
            size: { type: 'String', required: true },
        },
        createdAt: { type: 'Date', required: true, default: Date.now() },
        updatedAt: { type: 'Date', required: true, default: Date.now() },
    }, { timestamps: true },
);

module.exports = model('Cart', Cart);
