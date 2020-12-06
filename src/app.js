const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { PORT } = require('./config');
const router = require('./routes');
const db = require('./models');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router);

db.sequelize.sync({
    force: true,
})

app.listen(PORT);

module.exports = app;
