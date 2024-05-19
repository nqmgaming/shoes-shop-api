# Shoes Shop API

This project is a RESTful API for a Shoes Shop, built with Node.js, Express, and MongoDB. It provides a backend service
for an online shoe store, allowing users to manage products, categories, carts, and orders.

## Features

- User authentication and authorization
- CRUD operations for products
- CRUD operations for categories
- Cart management
- Order management

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- Joi for request validation
- dotenv for environment variable management
- Cloudinary for image storage
- Multer for handling multipart/form-data

## Getting Started

1. Clone the repository to your local machine.
2. Run `npm install` to install all the dependencies.
3. Create a `.env` file in the root directory and set up your environment variables (check `.env.example` for
   reference).
4. Run `npm start` to start the server.

## API Endpoints

- `/users`: User management (register, login, get user profile, update user profile)
- `/categories`: Category management (read)
- `/products`: Product management (read, update, search)
- `/carts`: Cart management (add product, remove product, view cart)
- `/orders`: Order management (create order, update order status, delete order)

## API Documentation

- You can find the API documentation [here](https://www.apidog.com/apidoc/shared-f2f525d2-bae8-427e-ae7c-6f237320f170).
- Email me to get the password to access the documentation.

## Contact

- Email: nguyenquangminh570@gmail.com

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
