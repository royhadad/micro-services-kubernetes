const express = require('express');
const getWeather = require('./routers/getWeather');
const getHistory = require('./routers/getHistory');
const postWeather = require('./routers/postWeather');

const app = new express();

app.use(express.json());
app.use(getWeather);
app.use(getHistory);
app.use(postWeather);

module.exports = app;