const cors = require("cors");
const functions = require('firebase-functions');
const express = require('express');
const actionsRoutes = require('./routes/actions.js');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/', actionsRoutes);

exports.app = functions.https.onRequest(app);