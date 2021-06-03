const app = require("./index");
const config = require("./config");

const server = app.listen(config.express.port, config.express.ip, () => {
    console.log(`Express running on PORT ${server.address().port}`);
});
