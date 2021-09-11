const express = require('express');
const createError = require('http-errors');

const { middlewares } = require('./middlewares');
const router = require('./routes');
const app = express();

middlewares(app);
router(app);

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