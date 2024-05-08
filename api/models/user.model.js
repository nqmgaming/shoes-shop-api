const {Schema, model} = require('mongoose');

const User = new Schema({
        email: { type: 'String', required: true },
        password: { type: 'String', required: true },
        image: { type: 'String', required: false },
        firstName: { type: 'String', required: true },
        lastName: { type: 'String', required: true },
        birthDate: { type: 'Date', required: true },
        address: { type: 'String', required: false },
        phoneNumber: { type: 'String', required: false },
        createdAt: { type: 'Date', required: true },
        updatedAt: { type: 'Date', required: true },
    }, { timestamps: true },
);

module.exports = model('Users', User);
