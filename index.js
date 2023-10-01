require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const { PORT, MONGO } = process.env;

mongoose.connect(`${MONGO}ChatServer`);

const database = mongoose.connection;

database.once("open", () => console.log(`Connected to ${MONGO}`));

// TODO require controllers

app.use(express.json);
// TODO add routes (app.use) that don't need to be validated
app.use(validateSession);
// TODO add routes (app.use) that do need to be validated

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
