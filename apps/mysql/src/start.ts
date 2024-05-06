import { MySQLApp } from './MySQLApp';

import { HttpServer } from '@hyperproof/hypersync-sdk';

const server = new HttpServer();
const app = new MySQLApp();
server.startListening(app.start());
