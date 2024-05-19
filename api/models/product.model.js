const {Schema, model, Types} = require('mongoose');
const Size = require('./size.model');

const Product = new Schema({
        name: {
            type: 'String',
            required: true,
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name must be less than or equal to 50 characters']
        },
        description: {
            type: 'String',
            required: true,
            trim: true,
            minlength: [10, 'Description must be at least 10 characters'],
            maxlength: [500, 'Description must be less than or equal to 500 characters']
        },
        price: {
            type: 'Number',
            required: true,
            trim: true,
            min: [0, 'Price must be at least 0']
        },
        category: {type: Types.ObjectId, ref: 'Category', required: true},
        imagePreview: {type: 'String', required: true},
        images: [{type: 'String', required: true}],
        stock: {
            type: 'Number',
            required: true,
            trim: true,
            min: [0, 'Stock must be at least 0']
        },
        rating: {
            type: 'Number',
            required: true,
            trim: true,
            min: [0, 'Rating must be at least 0'],
            max: [5, 'Rating must be less than or equal to 5']
        },
        size: {type: Types.ObjectId, ref: 'Size'},
        createdAt: {type: 'Date', required: true},
        updatedAt: {type: 'Date', required: true},
    }, {timestamps: true},
);

module.exports = model('Product', Product);
