# BGStudio-API

**BGStudio-API** is a Restful API designed to streamline beauty salon management. It offers an array of features, including an online booking system, inventory control, service, product, and promotional offer management, specialist and customer profiles, as well as an authentication process. This API is built using Node.js, Express, PassportJS, and PostgreSQL. Although it's currently under development, this README will help you get started.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)
- [API Documentation](#api_documentation)

## Features

**BGStudio-API** empowers you with the following features:

- **Authentication**: Utilize `/auth` to manage authentication and obtain access tokens.
- **Bookings**: Manage booking-related operations via `/bookings`.
- **Categories**: Organize your salon's offerings with `/categories`.
- **Consumables**: Handle consumables and related operations with `/consumables`.
- **Customers**: Manage customer information and profiles through `/customers`.
- **Orders**: Efficiently handle orders with `/orders`.
- **Payments**: Control payment-related operations via `/payments`.
- **Products**: Keep track of your salon's products and inventory using `/products`.
- **Profile**: Manage user profiles and settings through `/profile`.
- **Promotions**: Create and manage enticing promotional offers via `/promos`.
- **Services**: Easily manage a variety of beauty services offered by your salon with `/services`.
- **Specialists**: Manage crucial information about your salon's specialists via `/specialists`.
- **Stocks**: Keep a watchful eye on product inventory and stocks using `/stocks`.
- **Users**: Handle user-related operations through `/users`.



## Getting Started

### Prerequisites

Before you dive in, ensure you meet these requirements:

- Node.js and npm installed.
- PostgreSQL database set up.
- Basic understanding of Node.js, Express, and PostgreSQL.

### Installation

1. Clone the repository to your local machine:
`git clone https://github.com/lvargascol/bgstudio-api.git`
1. Change the working directory:
`cd bgstudio-api`
1. Install the required dependencies:
`npm install`
1. Set up the PostgreSQL database and configure the connection parameters in the .env file.
1. Start the API:
`npm run start`

##Configuration

Before running BGStudio-API, make sure to configure the following settings in the .env file:

**PORT**: Specify the port number on which the API will run.
**DB_USER**: Specify the User to access the Database.
**DB_PASSWORD**: Specify the Password to access the Database.
**DB_HOST**: Specify the Database Host.
**DB_NAME**: Specify the name of the Database.
**DB_PORT**: Specify the port number on which the Database will run.
**DATABASE_URL**: Provide the URL to your PostgreSQL database.
**API_KEY**: Assign a secret key for authentication, such as JWT, to enhance security.
**JWT_SECRET**: Assign a secret phrase for token encryption.
**MAIL_USER**: Specify a user address from which to send emails.
**MAIL_PASSWORD**: Specify the user email password.
**MAIL_HOST**: Specify the user email host.
**MAIL_PORT**: Specify the user email ṕort.
**FRONTEND_URL**: Specify the URL of the frontend site.

##API Endpoints

**BGStudio-API** exposes the following API endpoints, each serving a specific purpose in salon management:

`/auth`: Handle authentication and user management.
`/bookings`: Enable online booking for salon services.
`/categories`: Manage product categories.
`/consumables`: Handle consumables and related operations.
`/customers`: Handle customer profiles and interactions.
`/orders`: Manage orders for products and services.
`/payments`: Control payment-related operations.
`/products`: Handle salon products and their inventory.
`/promotions`: Create and manage promotional offers.
`/services`: Manage beauty salon services.
`/specialists`: Manage specialist information.
`/stocks`: Track product inventory and stocks.
`/users`: Handle user-related operations.

Each of these endpoints supports standard HTTP methods like GET, POST, PATCH, and DELETE, allowing for full CRUD (Create, Read, Update, Delete) functionality.

##Authentication

BGStudio-API utilizes PassportJS for authentication. To access protected endpoints, you need to obtain an authentication token. Make a POST request to `/auth/login` with valid credentials to receive a token. Include this token in the request headers of protected endpoints to ensure secure access.

##Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
1. Create your feature branch (`git checkout -b feature/your-feature`).
1. Commit your changes (`git commit -m '[ADD] Some feature'`).
1. Push your changes to the branch (`git push origin feature/your-feature`).
1. Open a pull request, and our team will review your contribution.	

##License

This project is licensed under the [MIT License](https://opensource.org/license/mit/http:// "MIT License.").

##API Documentation

For detailed API documentation, examples, and usage guidelines, please refer to the [Swagger Documentation](https://bgstudio-api-production.up.railway.app/api-docs/ "Swagger Documentation"). The Swagger documentation provides comprehensive information about the API endpoints, request parameters, and responses, making it easy for developers to understand and use the API.

------------

Feel free to explore and contribute to BGStudio-API. If you have any questions, issues, or feedback, please open a GitHub issue or contact me. I'm excited to have you on board, and i hope BGStudio-API helps you supercharge your beauty salon operations! Happy coding!