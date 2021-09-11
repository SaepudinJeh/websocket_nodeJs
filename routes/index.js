const HelloWorld = require('./HelloWorld');

module.exports = (app) => {
  app.use(HelloWorld);
};