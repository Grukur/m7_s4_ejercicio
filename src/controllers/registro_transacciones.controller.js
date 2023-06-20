import Registro from "../models/Registro.js";
import returnError from '../config/errorPostgres.js';

export const getRegistro = async (req, res) => {
    try {
        let registro = await Registro.findAll()
        res.send({
            status:200,
            data:registro.rows,
            message:'Registro obtenidos con exito'
        })
    } catch(error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al cargar Registro: ',messageError)
        }
    }
}

export const getRegistroBy = async (req, res) => {
    try {
        let {n_operacion} = req.params
        let result = await Registro.findBy(n_operacion)
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

export const createRegistro = async (req, res) => {
    try {
        let {rut, n_cuenta, detalle_operacion, abonos, cargos} = req.body
        let nuevoRegistro = new Registro()
        let result = await nuevoRegistro.create(rut, n_cuenta, detalle_operacion, abonos, cargos)
        res.send({
            code:200,
            data:result.rows,
            message:'Registro creado con exito'
        })
    } catch (error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al crear un Registro: ', messageError)
        }
    }
}

export const updateRegistro = async (req, res) => {
    try {
        let {n_operacion} = req.params
        let {rut, n_cuenta, detalle_operacion, abonos, cargos, balance} = req.body
        let result = await Registro.update(n_operacion, rut, n_cuenta, detalle_operacion, abonos, cargos, balance)
        res.send({
            code:200,
            data:result.rows,
            message:'Registro actualizado con exito'
        })
    } catch(error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al actualizar Registro: ', messageError)
        }
    }
}
export const deleteRegistro = async (req, res) => {
    try {
        let {n_operacion} = req.params
        let result = await Registro.delete(n_operacion)
        res.send({
            code:200,
            data:result.rows,
            message:'Registro Eliminado con exito'
        })
    } catch(error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al eliminar Registro: ', messageError)
        }
    }
}