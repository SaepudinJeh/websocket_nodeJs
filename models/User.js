// const ObjectID = require('mongodb').ObjectId;

const { dbConnect } = require('../configurations');

class User {
  constructor(dataUser) {
    this._dataUser = { ...dataUser };
  }

  save() {
    return new Promise((resolve, reject) => {
      try {
        dbConnect('users', async (db) => {
          const Place = await db.insertOne(this._dataUser);

          resolve(Place);
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

};

// const user = {
//   name: "wkwkw",
//   age: 23
// }

// const data = new User(user)
// // console.log(data)
// data.save().then((data) => {
//   console.log(data)
// }).catch(error => console.log(error))
module.exports = User;