const { OpenLibraryApp } = require("./build/OpenLibraryApp");
const app = new OpenLibraryApp();
module.exports = app.initialize();
