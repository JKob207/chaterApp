const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

const PORT = 3001;

const dotenv = require('dotenv').config();
app.use(cors());

const connectDB = require('./config/database');
const userModel = require('./models/user');

require('./config/passport')(passport);

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(routes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});