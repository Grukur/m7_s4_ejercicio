import db from './src/config/db.config.js';
import app from './src/app.js';
import { goHome } from './src/controllers/test.controller.js';


//Rutas
app.get(['/', '/home'], goHome)

const main = async () => {
    try {
        let client = await db.connect()
        let result = await client.query('select now();');
        console.log(
            'Conectado a la base de datos, hora servidor: '
            );
            const PORT = 3000
            let servidor = app.listen(PORT)
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
    }catch(error){
        console.log('error al iniciar servidor: ' + error)
    }
}

main()