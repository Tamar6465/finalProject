const express = require("express");

const app = express();
const path=require("path")
app.use(express.json());

app.get('/test', (req, res,next) => {
    res.send("hello")
    
    });


module.exports.app = app;