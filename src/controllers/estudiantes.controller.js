import Estudiantes from "../models/Estudiantes.js";
import returnError from "../db/errorPostgres.js";

export const getEstudiantes = async (req, res) => {
    try {
        let estudiante = await Estudiantes.findAll();
        res.send({
            code: 200,
            data: estudiante.rows,
            message: 'Ok'
        })

    } catch (error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al buscar todos los estudiantes: ', messageError);
        }
    }
}

export const getEstudianteById = async (req, res) => {
    try {
        let { id } = req.params
        let estudiante = await Estudiantes.findBy(id);
        res.send({
            code: 200,
            data: estudiante.rows,
            message: 'Encontrado.'
        })
    } catch (error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error en buscar por id: ', messageError)
        }
    }
}

export const createEstudiante = async (req, res) => {
    try {
        let { nombres, apellidos, edad, nro_identificacion } = req.body;
        let nuevoEstudiante = new Estudiantes(nombres, apellidos, edad, nro_identificacion);
        let result = await nuevoEstudiante.createEstudiante()
        res.send({
            code:200,
            data:result.rows,
            message:'Estudiante creado con exito'
        })
    } catch (error) {
        if(error.code){
            let messageError = returnError(error);
            console.log("Error en creacion de estudiante: ", messageError)
        }
    }
}

export const updateEstudiante = async (req, res) => {
    try {
        let {id} = req.params;
        let { nombres, apellidos, edad, nro_identificacion } = req.body;
        let result = await Estudiantes.updateEstudiante(id, nombres, apellidos, edad, nro_identificacion)
        res.send({
            code:200,
            data:result.rows,
            message:"Actualizado correctamente"
        })
    } catch (error){
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al actualizar estudiante: ', messageError)
        }
    }
}

export const deleteEstudiante = async (req, res) => {
    try {
        let {id} = req.params
        let result = await Estudiantes.deleteEstudiante(id)
        res.send({
            code:200,
            data:result.rows,
            message:`Estudiante con id: ${id} eliminado`
        })
    } catch (error){
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al eliminar estudiante: ', messageError)
        }
    }
}