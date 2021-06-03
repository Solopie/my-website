require("dotenv").config();
var join = require("path").join;

var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === "production";

config.express = {
    port: process.env.EXPRESS_PORT,
    ip: "127.0.0.1",
    publicFolder: join(__dirname + "/../wwwroot")
};

if (PRODUCTION) {
    config.express.ip = "0.0.0.0";
}
