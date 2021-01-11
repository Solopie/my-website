require("dotenv").config();
const express = require("express");
const serveIndex = require("serve-index");
const rateLimit = require("express-rate-limit");

const app = express();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1);

// Default rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.set("view engine", "pug");

// Apply rate limiter
app.use(limiter);

// No indexing of my website
app.use((req, res, next) => {
    res.setHeader("X-Robots-Tag", "none");
    next();
});

// Statically served files
app.use(express.static(__dirname + "/public"));
app.use("/images", serveIndex("public/images", { "icons": true }));

app.get("/", (req, res) => {
    res.render("index", { title: "Homepage" });
});

app.get("/projects", (req, res) => {
    res.send("Projects page in progress...");
});

app.get("/resume", (req, res) => {
    res.sendFile(__dirname + "/public/files/resume11012021.pdf");
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Express running on PORT ${server.address().port}`);
});
