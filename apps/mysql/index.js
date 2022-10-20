const { MySQLApp } = require("./build/MySQLApp");
const app = new MySQLApp();
module.exports = app.initialize();
