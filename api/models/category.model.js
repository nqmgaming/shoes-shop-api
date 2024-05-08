const {Schema, model, Types} = require('mongoose');

const Category = new Schema({
        name: { type: 'String', required: true },
        description: { type: 'String', required: true },
        numberOfProducts: { type: Types.ObjectId, ref: 'Product', required: true },
        createdAt: { type: 'Date', required: true },
        updatedAt: { type: 'Date', required: true },
    }, { timestamps: true },
);

module.exports = model('Category', Category);
