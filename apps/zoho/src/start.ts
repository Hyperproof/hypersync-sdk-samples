import { HttpServer } from '@hyperproof/integration-sdk';
import { ZohoApp } from './ZohoApp';

const server = new HttpServer();
const app = new ZohoApp();
server.startListening(app.start());
