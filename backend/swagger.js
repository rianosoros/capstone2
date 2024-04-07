const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokegotchi API',
      version: '1.0.0',
      description: 'Your API Description',
    },
  },
  apis: ['./routes/*.js'], // Path to the routes files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;