import db from '../db/db.js'

class Cursos {
    constructor(titulo, descripcion) {
        this.titulo = titulo;
        this.descripcion = descripcion

    }

    static findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "SELECT id, titulo, descripcion FROM cursos",
                    values: [],
                }
                let resultado = await db.query(query);
                return resolve(resultado);
            } catch (error) {
                reject(error)
            }
        });
    }

    static findBy(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "SELECT id, titulo, descripcion FROM cursos where id = $1",
                    values: [id],
                }
                let resultado = await db.query(query);
                return resolve(resultado);
            } catch (error) {
                reject(error)
            }
        });
    }

    createCursos() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: `INSERT INTO cursos(titulo, descripcion) VALUES($1,$2) returning id, titulo, descripcion`,
                    values: [this.titulo, this.descripcion],
                };
                let resultado = await db.query(query);
                return resolve(resultado);
            } catch (error) {
                console.log(error)
                reject(error);
            }
        })
    };

    static updateCursos(id, titulo, descripcion) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'UPDATE cursos SET titulo=$2, descripcion=$3 WHERE id = $1',
					values: [id, titulo, descripcion],
				};
				let resultado = await db.query(query);
				return resolve(resultado);
			} catch (error) {
				reject(error);
			}
		});
	}

    static deleteCursos(id) {
        return new Promise(async (resolve, reject)=>{
            try {
                let query = {
                    text:`DELETE FROM cursos WHERE id=$1`,
                    values:[id],
                };
                let resultado = await db.query(query);
                return resolve (resultado);
            } catch (error) {
                reject(error)
            }
        })
    }
};

export default Cursos;