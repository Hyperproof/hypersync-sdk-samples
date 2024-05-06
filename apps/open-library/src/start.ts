import { OpenLibraryApp } from './OpenLibraryApp';

import { HttpServer } from '@hyperproof/hypersync-sdk';

const server = new HttpServer();
const app = new OpenLibraryApp();
server.startListening(app.start());
