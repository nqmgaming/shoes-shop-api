const { Schema, model, Types } = require('mongoose');


const Favorite = new Schema({
        user: { type: Types.ObjectId, ref: 'User', required: true },
        product: { type: Types.ObjectId, ref: 'Product', required: true },
        createdAt: { type: 'Date', required: true, default: Date.now() },
        updatedAt: { type: 'Date', required: true, default: Date.now() },
    },
    {
        timestamps: true
    },
);

module.exports = model('Favorite', Favorite);
