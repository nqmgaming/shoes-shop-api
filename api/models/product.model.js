const {Schema, model, Types} = require('mongoose');

const Product = new Schema({
        name: { type: 'String', required: true },
        description: { type: 'String', required: true },
        price: { type: 'Number', required: false },
        category: { type: Types.ObjectId, ref: 'Category', required: true },
        image: { type: 'String', required: true },
        stock: { type: 'Number', required: true },
        rating: { type: 'Number', required: true },
        size: { type: Types.ObjectId, ref: 'Size' },
        createdAt: { type: 'Date', required: true },
        updatedAt: { type: 'Date', required: true },
    }, { timestamps: true },
);

module.exports = model('Products', Product);
