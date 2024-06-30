# Style.Loom

Welcome to the **Style.Loom** project! This is a comprehensive e-commerce platform built with Next.js and TypeScript, featuring a robust seller and user panel and seamless integration with MongoDB Atlas.


### Tech Stack: <br/>
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) 


## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)
- [APIs and Endpoints](#apis-and-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

**Style.Loom** is an e-commerce platform designed to provide a seamless experience for both sellers and buyers. Sellers can manage their products efficiently, while users can enjoy a smooth shopping experience with secure checkout processes.
- [Live Preview](https://style-loom-black.vercel.app/)

## Features

1. **Seller Panel**
   - Create, update, and delete products.
   - View and manage product listings.
   - Track inventory.

2. **User Panel**
   - Browse products and add them to the cart.
   - Checkout with real-time product quantity validation.

3. **Protected Routes**
   - Secure access to user-specific and seller-specific pages.
   - Authentication and authorization to ensure proper access control.

4. **MongoDB Atlas Integration**
   - Robust database management with MongoDB Atlas.
   - Efficient data retrieval and manipulation for high performance.

## Installation

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js** (v14 or higher) and **npm** (v6 or higher)
- **MongoDB Atlas** account
- **Git** for version control

### Steps

1. **Clone the repository:**

   `git clone https://github.com/sagarsen2023/Style-Loom.git`

   `cd style-loom`

2. **Install dependencies:**

   `npm install`


3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   `MONGODB_URI=<your-mongodb-atlas-connection-string>`

## Configuration

### MongoDB Atlas

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Obtain the connection string and replace `<your-mongodb-atlas-connection-string>` in the `.env` file.

### Environment Variables

Ensure you set the correct values for all required environment variables in your `.env` file.

## Running the Project

To start the development server:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Typed JavaScript for better developer experience and code quality.
- **MongoDB Atlas**: Cloud-based NoSQL database for scalable data storage.
- **Axios**: Promise-based HTTP client for making API requests.
- **Sonner**: Library for toast notifications.
- **CSS Modules**: Scoped CSS for styling React components.

## Major APIs and Endpoints

### Product Management

- **POST** `/api/product/addproduct`: Create a new product using `name, description, price, category, quantity, image, createdBy`.
- **POST** `/api/product/editproduct`: Update an existing product using `name, description, price, category, quantity, image, productID`. 
- **POST** `/api/product/deleteproduct`: Delete a product based on `productID, sellerID`.
- **POST** `/api/product/details`: Fetches a product based on `productID`.
- **POST** `/api/product/changeproductquantity`: Update product quantity based on `productID, quantity`.
- **POST** `/api/product/getproductbycategory`: Returns products based on `category`.

### User Management

- **POST** `/api/getuserdata`: Fetches a user details by `_userID` & `_userType`
- **POST** `/api/user/signup`: Registers a new user using `name, password, email, type`.
- **POST** `/api/user/login`: Authenticate a user using `email, password, type`.
- **POST** `/api/user/logout`: Logouts a user `Fetches data from cookies`.
- **POST** `/api/user/updateuser`: Update user information and cart. Requires `cart, userID`.
- **POST** `/api/user/updateseller`: Update seller information and their listings. Requires `_id, products`.

### Cart and Checkout

- **Function** For Checkout `src/utils/checkout.ts`
- **Function** For Add to Cart `src/utils/addProductToCart.ts`


## Contributing

We welcome contributions to the Style.Loom project! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request for review.

Please ensure your code follows our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance. Happy coding!
