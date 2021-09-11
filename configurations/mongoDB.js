require('dotenv').config({ path: './configurations/.env' });
const { MongoClient } = require('mongodb');

const dbConnect = (coll, cb) => {
  MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(async (client) => {
    console.log('Database connect');
    const db = client.db('Destinations').collection(coll);

    await cb(db);
    client.close();
  }).catch(error => {
    console.log(error);
  });
};

module.exports = dbConnect;
