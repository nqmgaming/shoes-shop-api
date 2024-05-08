const {Schema, model, Types} = require('mongoose');

const OrderSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            product: {
                type: Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },


}, {
    timestamps: true,
});

module.exports = model('Order', OrderSchema);
