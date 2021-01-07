const express = require("express");
const serveIndex = require("serve-index");
const app = express();
app.set("view engine", "pug");

// No indexing of my website
app.use((req, res, next) => {
    res.setHeader("X-Robots-Tag", "none");
    next();
});

app.use(express.static(__dirname + "/public"));
app.use("/images", serveIndex("public/images", { "icons": true }));

app.get("/", (req, res) => {
    res.render("index", { title: "Homepage" });
});

app.get("/projects", (req, res) => {
    res.send("Projects page in progress...");
});

const server = app.listen(3000, () => {
    console.log(`Express running on PORT ${server.address().port}`);
});
