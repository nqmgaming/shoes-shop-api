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
                trim: true,
                min: [1, 'Quantity must be at least 1']
            },
        },
    ],
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, 'Address must be at least 10 characters'],
        maxlength: [100, 'Address must be less than or equal to 100 characters']
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Please use a valid phone number.'],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    total: {
        type: Number,
        required: true,
        trim: true,
        min: [0, 'Total must be at least 0']
    },
    time: {
        type: Date,
        trim: true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    }
}, {
    timestamps: true,
});

module.exports = model('Order', OrderSchema);
