const express = require('express');
const cors = require('cors');
const routersApi = require('./routes');
const { checkApiKey } = require('./middlewares/authHandler.js');
const {
  logErrors,
  errorsHandler,
  boomErrorHandler,
  validationErrorHandler,
} = require('./middlewares/errorHandler.js');

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());

require('./utils/auth');

routersApi(app);


app.listen(port, () => {});

// //Whitelist contiene los dominios habilitados para acceder a nuesta API

// const whitelist = ['http://127.0.0.1:5500','http://localhost:5500','https://myapp.ldvc'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null,true);
//     } else {
//       callback(new Error('No permitido'));
//     }
//   }
// }
// app.use(cors(options));

app.use(logErrors);
app.use(validationErrorHandler);
app.use(boomErrorHandler);
app.use(errorsHandler);
