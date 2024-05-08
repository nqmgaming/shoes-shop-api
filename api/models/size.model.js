const {Schema, model, Types} = require('mongoose');

const Size = new Schema({
        name: { type: 'String', required: true },
        size: [
            {
                id: { type: 'Number', required: true },
                name: { type: 'String', required: true },
            }
        ],
        createdAt: { type: 'Date', required: true },
        updatedAt: { type: 'Date', required: true },
    }, { timestamps: true },
);

module.exports = model('Size', Size);
