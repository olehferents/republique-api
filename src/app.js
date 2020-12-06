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

app.use((err, req, res, next) => {
    if (!err) {
        next();
    }
    console.error(err);
    res.status(500).send('500: Internal server error!');
})

db.sequelize.sync({
    force: true,
})

app.listen(PORT);

module.exports = app;
