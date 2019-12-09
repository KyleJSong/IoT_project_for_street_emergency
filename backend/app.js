var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var currentRouter = require('./routes/current');
var previousRouter = require('./routes/previous');
var detailRouter = require('./routes/detail');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/current', currentRouter);
app.use('/api/previous', previousRouter);
app.use('/api/detail', detailRouter);

module.exports = app;
