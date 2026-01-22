const { JsonPlaceholderApp } = require('./build/JsonPlaceholderApp');
const app = new JsonPlaceholderApp();
module.exports = app.initialize();
