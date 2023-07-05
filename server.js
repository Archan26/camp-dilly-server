const express = require('express');
const cookieparser = require('cookie-parser');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: './production.env' });
const port = process.env.PORT || 3000;
// const { connection, connect } = require('mongoose');

const { db } = require('./utils/databaseConnection.js')
const admin = require('./routes/admin/index.js')
const customer = require('./routes/customer/index.js')
db.initialize()

app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cookieparser());
app.use(cors());

// Register route
app.use('/admin', admin);
app.use('/customer', customer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
