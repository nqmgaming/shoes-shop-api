const {Schema, model, Types} = require('mongoose');

const Delivery = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPrimaryDelivery: {
        type: Boolean,
        default: false
    },
    fristName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model('Delivery', Delivery);




