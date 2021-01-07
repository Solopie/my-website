const express = require("express");
const serveIndex = require("serve-index");
const app = express();
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use("/images", serveIndex("public/images", { "icons": true }));

app.get("/", (req, res) => {
    res.render("index", { title: "Homepage" });
});

const server = app.listen(3000, () => {
    console.log(`Express running on PORT ${server.address().port}`);
});
