const {Schema, model} = require('mongoose');

const User = new Schema({
        email: {
            type: 'String',
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        },
        password: {
            type: 'String',
            required: true,
            minlength: [6, 'Password must be at least 6 characters'],
        },
        avatar: {
            public_id: {
                type: String,
                required: false
            },
            url: {
                type: String,
                required: false
            },
        },
        firstName: {
            type: 'String',
            required: true,
            trim: true,
            minlength: [2, 'First name must be at least 2 characters'],
            maxlength: [50, 'First name must be less than or equal to 50 characters']
        },
        lastName: {
            type: 'String',
            required: true,
            trim: true,
            minlength: [2, 'Last name must be at least 2 characters'],
            maxlength: [50, 'Last name must be less than or equal to 50 characters']
        },
        birthDate: {type: 'Date', required: true},
        address: {type: 'String', required: true},
        phoneNumber: {
            type: 'String',
            trim: true,
            required: false,
            match: [/^\d{10}$/, 'Please use a valid phone number.'],
        },
        createdAt: {type: 'Date', required: true},
        updatedAt: {type: 'Date', required: true},
    }, {timestamps: true},
);

module.exports = model('Users', User);
