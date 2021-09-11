const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');

module.exports = {
  middlewares: (app) => {
    app.use(compression());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
  }
};