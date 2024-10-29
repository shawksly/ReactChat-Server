require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const { PORT, MONGO } = process.env;

// mongoose.connect(`${MONGO}`);
// https://stackoverflow.com/questions/57337218/how-to-connect-to-specific-database-with-mongoose-and-node
mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ReactChat-Database',
  })
  .then(() => {
    console.log('Connected to the Database.');
  })
  .catch(err => console.error(err));

const database = mongoose.connection;

database.once("open", () => console.log(`Connected to MongoDB!`));

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
