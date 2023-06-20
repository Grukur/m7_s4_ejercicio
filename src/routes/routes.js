import express from 'express';

import { createCuenta, deleteCuenta, getCuentaById, getCuentas, updateCuenta } from '../controllers/cuentas.controller.js';
import { createUsuarios, deleteUsuarios, getUsuarioBy, getUsuarios, updateUsuarios } from '../controllers/usuarios.controller.js';
import { getRegistro, deleteRegistro, getRegistroBy, createRegistro, updateRegistro } from '../controllers/registro_transacciones.controller.js';

const router = express.Router()

//Endpoints para acceder a la tabla Cuentas
router.get('/cuentas', getCuentas)
router.get('/cuentas/:rut', getCuentaById)
router.post('/cuentas', createCuenta)
router.put('/cuentas/:n_cuenta', updateCuenta)
router.delete('/cuentas/:n_cuenta', deleteCuenta)

//Endpoints para acceder a Cursos
router.get('/usuarios', getUsuarios)
router.get('/usuarios/:rut', getUsuarioBy)
router.post('/usuarios', createUsuarios)
router.put('/usuarios/:rut', updateUsuarios)
router.delete('/usuarios/:rut', deleteUsuarios)

//Endpoints para acceder a Cursos
router.get('/registros', getRegistro)
router.get('/registros/:n_operacion', getRegistroBy)
router.post('/registros', createRegistro)
router.put('/registros/:n_operacion', updateRegistro)
router.delete('/registros/:n_operacion', deleteRegistro)


export default router


