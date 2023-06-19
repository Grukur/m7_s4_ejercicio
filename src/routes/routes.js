import express from 'express';
import {createEstudiante, deleteEstudiante, getEstudianteById, getEstudiantes, updateEstudiante} from '../controllers/estudiantes.controller.js';
import { createCursos, deleteCursos, getCursoBy, getCursos, updateCursos } from '../controllers/cursos.controller.js';
const router = express.Router()

//Rutas para acceder a la tabla Estudiantes
router.get('/estudiantes', getEstudiantes)
router.get('/estudiantes/:id', getEstudianteById)
router.post('/estudiantes', createEstudiante)
router.put('/estudiantes/:id', updateEstudiante)
router.delete('/estudiantes/:id', deleteEstudiante)

//Rutas para acceder a Cursos
router.get('/cursos', getCursos)
router.get('/cursos/:id', getCursoBy)
router.post('/cursos', createCursos)
router.put('/cursos/:id', updateCursos)
router.delete('/cursos/:id', deleteCursos)


export default router


