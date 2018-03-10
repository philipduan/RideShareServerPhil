const { mongoose } = require('./db/db');
const express = require('express');
const bodyParser = require('body-parser');
const passengerRoute = require('./routes/passengerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const userRoute = require('./routes/userRoutes');
const driverRoute = require('./routes/driverRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  //Access for CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  // Remmovng the cache for most recent comments
  // res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/user', userRoute);
app.use('/driver', driverRoute);
app.use('/passenger', passengerRoute);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Started up on PORT ${PORT}`);
});
