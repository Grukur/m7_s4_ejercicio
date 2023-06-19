import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/api/', router)


export default app;