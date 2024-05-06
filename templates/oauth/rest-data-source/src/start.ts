import { App } from './App';

import { HttpServer } from '@hyperproof/hypersync-sdk';

const server = new HttpServer();
const app = new App();
server.startListening(app.start());
