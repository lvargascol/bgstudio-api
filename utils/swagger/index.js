
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "BGStudio API",
      version: "0.1.0"
    },
    servers: [
      {
        url: "https://bgstudio-api-production.up.railway.app"
      }
    ],
  },
  components: {
    securitySchemas: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
    },
  },
  security: [{ bearerAuth: [] }],
  apis: [`${path.join(__dirname, "../../routes/*.js")}`,`${path.join(__dirname, "../../schemas/*.js")}`],
}

console.log(options.apis);

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

module.exports = { swaggerDocs };
