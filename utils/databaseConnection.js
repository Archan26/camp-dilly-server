const mongoose = require('mongoose')
require('dotenv').config({ path: '../production.env' });

const url = process.env.DB_CONNECTION_URL;

const db = {}

db.initialize = () => {
  mongoose
    .connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      maxPoolSize: 100,
    })
    .then(() => {
      console.log('Database Connected')
    })
    .catch((error) => {
      console.log('Connection Error', error)
    })
}

module.exports = { db }
