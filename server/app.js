const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/LearnDemy', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology : false
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/api/signUp', require('./router/signUp'));
app.use('/api/signIn', require('./router/signIn'));
app.use('./api/upload', require('./router/upload'));

module.exports = app;