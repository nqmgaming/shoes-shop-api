const {Schema, model, Types} = require('mongoose');

const Size = new Schema({
        name: {
            type: 'String',
            required: true,
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name must be less than or equal to 50 characters']
        },
        size: [
            {
                id: {
                    type: 'Number',
                    required: true,
                    trim: true,
                    min: [1, 'ID must be at least 1']
                },
                name: {
                    type: 'String',
                    required: true,
                    trim: true,
                    minlength: [2, 'Name must be at least 2 characters'],
                    maxlength: [50, 'Name must be less than or equal to 50 characters']
                },
            }
        ],
        createdAt: {type: 'Date', required: true},
        updatedAt: {type: 'Date', required: true},
    }, {timestamps: true},
);

module.exports = model('Size', Size);
