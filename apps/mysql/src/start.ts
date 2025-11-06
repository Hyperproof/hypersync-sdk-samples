import { HttpServer } from '@hyperproof/integration-sdk';
import { MySQLApp } from './MySQLApp';

const server = new HttpServer();
const app = new MySQLApp();
server.startListening(app.start());
