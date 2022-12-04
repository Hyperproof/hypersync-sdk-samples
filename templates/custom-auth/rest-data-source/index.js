const { CustomApp } = require("./build/CustomApp");
const app = new CustomApp();
module.exports = app.initialize();
