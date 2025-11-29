const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Zarahemla Store API',
        description: 'An API documentation for Zarahemla store.',
    },
    host: 'localhost:3000',
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
