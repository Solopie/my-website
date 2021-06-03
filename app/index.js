const express = require("express");
const serveIndex = require("serve-index");
const rateLimit = require("express-rate-limit");
const join = require("path").join;
const app = express();
const config = require("./config.js");

app.set("views", join(__dirname, "./views"));
app.set("view engine", "pug");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1);

// Default rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiter
app.use(limiter);

// No indexing of my website
app.use((req, res, next) => {
    res.setHeader("X-Robots-Tag", "none");
    next();
});

// Statically served files
app.use(express.static(config.express.publicFolder));
// Show directory listing
app.use("/images", serveIndex(join(config.express.publicFolder, "/images"), { "icons": true }));

// Routers
app.use(require("./site/router"));

module.exports = app;