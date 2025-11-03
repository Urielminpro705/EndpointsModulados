// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuracion de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion de la API', // Titulo de la documentacion
    version: '1.0.0', // Version de la API
    description: 'Documentacion de la API con Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000', // URL base de la API
      description: 'Servidor de desarrollo'
    }
  ]
};

const options = {
  swaggerDefinition,
  // Paths to files
  apis: ['./routes/*.js'], // Ajustamos esto en la ruta de los archivos
}

const swaggerSpect = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpect));
}

module.exports = setupSwagger;
