const express = require('express');
const routersApi = require('./routes');
// const cors = require('cors');
const {
  logErrors,
  errorsHandler,
  boomErrorHandler,
  validationErrorHandler,
} = require('./middlewares/errorHandler.js');

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

routersApi(app);

app.get('/', (req, res) => {
  res.send('Hello, mi primer server de express');
});

app.listen(port, () => {
  console.log('Mi port es ' + port);
});

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
