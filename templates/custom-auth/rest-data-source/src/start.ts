import { HttpServer } from '@hyperproof/integration-sdk';
import { App } from './App';

const server = new HttpServer();
const app = new App();
server.startListening(app.start());
