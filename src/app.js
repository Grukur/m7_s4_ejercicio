import express from 'express';
import cors from 'cors';
import {create} from 'express-handlebars';
import router from './routes/routes.js';

//ejecutamos express
const app = express();

//creamos instancia handlebars
const hbs = create({
    partialsDir: ["views/partials/"],
});

//Configuramos handlebars como motor de plantilla para el rendirizado
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("views", "./views");

//MIDDLEWARES
app.use(express.json());
app.use(cors());

//publicamos carpeta public
app.use(express.static('public'));

//ROUTES
app.use('/api/', router)


export default app;