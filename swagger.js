const swaggerAutogen = require('swagger-autogen')();

const doc = {
    swagger: '2.0',
    info: {
        title: 'Zarahemla Store API',
        description: 'An API documentation for Zarahemla store.',
    },
    host: process.env.BASE_URL || '',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
