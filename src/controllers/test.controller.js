import returnError from '../config/errorPostgres.js';


export const goHome = async (req, res) => {
    try {
        res.render('home')
    } catch(error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al cargar Registro: ',messageError)
        }
    }
}