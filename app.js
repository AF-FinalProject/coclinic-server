const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
require('./services/cron')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);


module.exports = app