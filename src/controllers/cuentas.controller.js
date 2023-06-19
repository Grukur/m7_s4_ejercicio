import Cuenta from "../models/Cuentas.js";
import returnError from "../config/errorPostgres.js";

export const getCuentas = async (req, res) => {
    try {
        let cuenta = await Cuenta.findAll();
        res.send({
            code: 200,
            data: cuenta.rows,
            message: 'Ok'
        })

    } catch (error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al buscar todos los Cuenta: ', messageError);
        }
    }
}

export const getCuentaById = async (req, res) => {
    try {
        let { id } = req.params
        let cuenta = await Cuenta.findBy(id);
        res.send({
            code: 200,
            data: cuenta.rows,
            message: 'Encontrado.'
        })
    } catch (error) {
        if(error.code){
            let messageError = returnError(error);
            console.log('Error en buscar por id: ', messageError)
        }
    }
}

export const createCuenta = async (req, res) => {
    try {
        let { rut, n_cuenta, tipo } = req.body;
        let nuevaCuenta = new Cuenta(rut, n_cuenta, tipo);
        let result = await nuevaCuenta.create()
        res.send({
            code:200,
            data:result.rows,
            message:'Cuenta creado con exito'
        })
    } catch (error) {
        if(error.code){
            let messageError = returnError(error);
            console.log("Error en creacion de Cuenta: ", messageError)
        }
    }
}

export const updateCuenta = async (req, res) => {
    try {
        let {n_cuenta} = req.params;
        let { rut, tipo } = req.body;
        let result = await Cuenta.update(rut, n_cuenta, tipo)
        res.send({
            code:200,
            data:result.rows,
            message:"Actualizado correctamente"
        })
    } catch (error){
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al actualizar Cuenta: ', messageError)
        }
    }
}

export const deleteCuenta = async (req, res) => {
    try {
        let {n_cuenta} = req.params
        let result = await Cuenta.delete(n_cuenta)
        res.send({
            code:200,
            data:result.rows,
            message:`Cuenta numero: ${n_cuenta} eliminado`
        })
    } catch (error){
        if(error.code){
            let messageError = returnError(error);
            console.log('Error al eliminar Cuenta: ', messageError)
        }
    }
}