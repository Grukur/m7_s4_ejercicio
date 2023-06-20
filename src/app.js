import express from 'express';
import cors from 'cors';
import exphbs from 'express-handlebars';
import router from './routes/routes.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Execute express
const app = express();

// Create handlebars instance
const hbs = exphbs.create({
  partialsDir: [path.join(__dirname, 'views/partials')],
});

// Configure handlebars as the template engine for rendering
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// Publish the 'public' folder
app.use(express.static('public'));

// Publish the 'dist' folder of Bootstrap
app.use("/bootstrap", express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// ROUTES
app.use('/api/', router);

export default app;