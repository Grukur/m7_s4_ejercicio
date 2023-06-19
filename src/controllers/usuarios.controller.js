import Usuarios from "../models/Usuarios.js";
import returnError from '../config/errorPostgres.js';

export const getUsuarios = async (req, res) => {
    try {
        let usuarios = await Usuarios.findAll()
        res.send({
            status:200,
            data:usuarios.rows,
            message:'usuarios obtenidos con exito'
        })
    } catch(error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al cargar Usuarios: ',messageError)
        }
    }
}

export const getUsuarioBy = async (req, res) => {
    try {
        let {rut} = req.params
        let result = await Usuarios.findBy(rut)
        res.send({
            code:200,
            data:result.rows,
            message:'Curso por ID obtenido con exito'
        })
    }catch(error){
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al buscar curso por id: ', messageError)           
        }
    }
}

export const createUsuarios = async (req, res) => {
    try {
        let {rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono} = req.body
        let nuevoCurso = new Usuarios(rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono)
        let result = await nuevoCurso.create()
        res.send({
            code:200,
            data:result.rows,
            message:'Curso creado con exito'
        })
    } catch (error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al crear un curso: ', messageError)
        }
    }
}

export const updateUsuarios = async (req, res) => {
    try {
        let {rut} = req.params
        let {clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono} = req.body
        console.log(clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono)
        let result = await Usuarios.update(rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono)
        res.send({
            code:200,
            data:result.rows,
            message:'Curso actualizado con exito'
        })
    } catch(error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al actualizar curso: ', messageError)
        }
    }
}
export const deleteUsuarios = async (req, res) => {
    try {
        let {rut} = req.params
        let result = await Usuarios.delete(rut)
        res.send({
            code:200,
            data:result.rows,
            message:'Curso Eliminado con exito'
        })
    } catch(error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al eliminar curso: ', messageError)
        }
    }
}
