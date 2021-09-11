require('dotenv').config({ path: './configurations/.env' });
const http = require('http');

const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on PORT ${process.env.PORT}`);
});