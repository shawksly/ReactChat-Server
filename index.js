require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const { PORT, MONGO } = process.env;

mongoose.connect(`${MONGO}/ChatServer`);

const database = mongoose.connection;

database.once("open", () => console.log(`Connected to ${MONGO}`));

// TODO require controllers

const user = require('./controllers/user.controller');
const validateSession = require('./middleware/validateSession');
const rooms = require('./controllers/room.controller');
const messages = require('./controllers/message.controller')

app.use(express.json());
app.use(require('cors')());

// TODO add routes (app.use) that don't need to be validated
app.use('/user', user);
app.use(validateSession);

// TODO add routes (app.use) that do need to be validated
app.use('/room', rooms);
app.use('/message', messages)

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
