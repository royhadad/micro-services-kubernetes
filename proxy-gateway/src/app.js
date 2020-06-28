const express = require('express');
var proxy = require('express-http-proxy');

const app = new express();
app.use(express.json());
app.use("/ping", (req, res) => {
    res.send("pong");
});
app.use('/auth', proxy(`auth:5002`));
app.use('/weather', proxy(`weather:5001`));

module.exports = app;