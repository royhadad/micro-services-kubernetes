const express = require('express');
const userRouter = require('./routers/user');
const app = new express();

app.use(express.json());
app.use(userRouter);

module.exports = app;