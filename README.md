# Zarahemla Store API
An application that contains the APIs for an e-commerce store called Zarahemla Store.

## Installation
```npm install```

## Running the application
```npm run start``` or  ```npm start```

## Authentication (GitHub OAuth)
*Important: Only do this setup if you want to use your own Client ID & Client Secret from GitHub.*

Use the following configuration when creating GitHub OAuth settings:

For `local` environment:
* Homepage URL: http://localhost:3000
* Callback URL: http://localhost:3000/auth/github

For `production` environment:
* Homepage URL: https://zarahemla.onrender.com
* Callback URL: https://zarahemla.onrender.com/auth/github

## Environment Variables

1. Copy the `.env.example` file to `.env`.
2. Set the values of the following variables:
   * `MONGODB_URI`
   * `GITHUB_CLIENT_SECRET`


## API Documentation (Swagger)
You can update the documentation by `npm run swagger` or `node swagger.js`. The documentation can be accessed from http://localhost:3000/api-docs (local) or https://zarahemla.onrender.com (production).

## Packages
* express
* swagger-autogen
* swagger-ui-express
* mongodb
* cors
* dotenv
* express-validator
* passport
* passport-github2
* express-session

## Developers
* Gilbor Camporazo Jr.
* Nelson Alexander Ortega
* Francis Happy