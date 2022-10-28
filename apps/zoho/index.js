const { ZohoApp } = require("./build/ZohoApp");
const app = new ZohoApp();
module.exports = app.initialize();
