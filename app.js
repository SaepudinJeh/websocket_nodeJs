const express = require('express');
const path = require('path');
const createError = require('http-errors');

const { middlewares } = require('./middlewares');
const app = express();

middlewares(app);

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  const error = createError(404);
  next(error)
});

app.use((error, req, res, next) => {
  res.statusCode = error.statusCode;
  res.json({
    message: error.message,
    statusCode: error.statusCode
  })
});

module.exports = app;