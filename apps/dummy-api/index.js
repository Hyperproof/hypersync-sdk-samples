const { DummyApiApp } = require('./build/DummyApiApp');
const app = new DummyApiApp();
module.exports = app.initialize();
