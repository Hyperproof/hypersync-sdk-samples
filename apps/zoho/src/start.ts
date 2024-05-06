import { ZohoApp } from './ZohoApp';

import { HttpServer } from '@hyperproof/hypersync-sdk';

const server = new HttpServer();
const app = new ZohoApp();
server.startListening(app.start());
