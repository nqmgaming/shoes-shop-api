const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');
const auth = require('../middlewares/auth.middleware');
const Joi = require('joi');

const Users = require('../models/user.model');


const schema = Joi.object({
    email: Joi.string().email().required(),
})

// Check user exits
exports.checkUserExits = async (req, res, next) => {
    const {error} = schema.validate({email: req.params.email});
    const email = req.params.email;
    if (email) {
        try {
            const user = await Users.findOne({email: email}).select('-password')
            if (!user) {
                return res.json(false);
                console.log("Email not found")
            }
            return res.json(true);
        } catch (error) {
            res.status(500).json({error: error.message});
            console.log("Email not found")
        }
    } else {
        return res.status(400).json({message: 'Email is required'});
    }
}

// Sign in
exports.signIn = async (req, res, next) => {
    const {email, password} = req.body;
    if (email && password) {
        try {
            const user = await Users.findOne({email: email});
            if (!user) {
                return res.status(404).json({message: 'Email not found, please sign up or check your email'});
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({message: 'Password is incorrect'});
            }

            const accessToken = auth.createToken(user);
            return res.status(200).json({
                data: {
                    _id: user._id,
                    email: user.email,
                    avatar: user.avatar.url,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthDate: user.birthDate,
                    address: user.address,
                    phoneNumber: user.phoneNumber
                },
                accessToken: accessToken
            });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } else {
        return res.status(400).json({message: 'Email and password are required'});
    }
}

// Sign up
exports.signUp = async (req, res, next) => {
    const {email, password, firstName, lastName, birthDate, address, phoneNumber} = req.body;
    if (email && password && firstName && lastName && birthDate && address && phoneNumber) {
        try {
            // Check if the email already exists in the database
            const existingUser = await Users.findOne({email});
            if (existingUser) {
                return res.status(400).json({error: 'Email already exists'});
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user
            const newUser = new Users({
                email,
                password: hashedPassword,
                avatar: req.file ? req.file.path : null,
                firstName,
                lastName,
                birthDate,
                address,
                phoneNumber,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            // Save the user to the database
            await newUser.save();

            const accessToken = auth.createToken(newUser);
            return res.status(201).json({
                data: {
                    _id: newUser._id,
                    email: newUser.email,
                    avatar: newUser.avatar.url,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    birthDate: newUser.birthDate,
                    address: newUser.address,
                    phoneNumber: newUser.phoneNumber
                },
                accessToken: accessToken
            });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } else {
        return res.status(400).json({message: 'All fields are required'});
    }
}

exports.updateUser = async (req, res, next) => {
    const data = req.body;
    const userId = req.params.id;
    console.log(req.file);
    if (data && userId) {
        try {
            const user = await Users.findById(req.params.id);
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }

            if (req.file) {
                if (user.avatar.public_id) {
                    await cloudinary.uploader.destroy(user.avatar.public_id);
                }
                await cloudinary.uploader.upload(req.file.path, {
                    folder: 'avatars'
                }, (error, resultn) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result.secure_url);
                        user.avatar.public_id = result.public_id;
                        user.avatar.url = result.secure_url;
                    }
                });
            }

            if (data.password && data.password !== user.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(data.password, salt);
                user.password = hashedPassword;
            }

            if (data.email && data.email !== user.email) {
                const existingUser = await Users.findOne({email: data.email});
                if (existingUser) {
                    return res.status(400).json({error: 'Email already in use'});
                }
                user.email = data.email;
            }
            if (data.firstName) {
                user.firstName = data.firstName;
            }
            if (data.lastName) {
                user.lastName = data.lastName;
            }
            if (data.birthDate) {
                user.birthDate = data.birthDate;
            }
            if (data.address) {
                user.address = data.address;
            }
            if (data.phoneNumber) {
                user.phoneNumber = data.phoneNumber;
            }

            await user.save();

            res.json({
                user: {
                    _id: user._id,
                    email: user.email,
                    avatar: user.avatar.url,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthDate: user.birthDate,
                    address: user.address,
                    phoneNumber: user.phoneNumber
                }
            });
        } catch (error) {
            res.status(500).json({error: error.message});
            console.log(error);

        }
    } else {
        return res.status(400).json({message: 'All fields are required'});
    }
}
