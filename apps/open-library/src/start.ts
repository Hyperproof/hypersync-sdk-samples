import { HttpServer } from '@hyperproof/integration-sdk';
import { OpenLibraryApp } from './OpenLibraryApp';

const server = new HttpServer();
const app = new OpenLibraryApp();
server.startListening(app.start());
