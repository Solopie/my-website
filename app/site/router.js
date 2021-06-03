const express = require("express");
const join = require("path").join;
const config = require("../config");

var router = new express.Router();

router.use(express.static(config.express.publicFolder));
router.get("/", (req, res) => {
    res.render("index", { title: "Homepage" });
});

router.get("/projects", (req, res) => {
    res.send("Projects page in progress...");
});

router.get("/resume", (req, res) => {
    res.sendFile(join(config.express.publicFolder, "/files/resume11012021.pdf"));
});



module.exports = router;