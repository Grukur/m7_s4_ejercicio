import db from '../db/db.js'


class Estudiantes {
    constructor(nombres, apellidos, edad, nro_identificacion) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.edad = edad;
        this.nro_identificacion = nro_identificacion;
    }

    static findAll() {
        return new Promise(async (resolve, reject) => {
            try {               
                let result = await db.query(
                    "SELECT id, nombres, apellidos, edad, nro_identificacion FROM estudiantes"
                );
                resolve(result);
            } catch (error) {
                console.log(error)
                reject(error)
            }
        });
    };

    static findBy(id) {
        return new Promise(async (resolve, reject) => {
            try {               
                let result = await db.query(
                    "SELECT id, nombres, apellidos, edad, nro_identificacion FROM estudiantes where id = $1",
                    [id]
                );
                resolve(result);
            } catch (error) {
                console.log(error)
                reject(error)
            }
        });
    };

    createEstudiante() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: `INSERT INTO estudiantes(nombres, apellidos, edad, nro_identificacion) VALUES($1,$2,$3,$4) returning id, nombres, apellidos, edad, nro_identificacion`,
                    values: [this.nombres, this.apellidos, this.edad, this.nro_identificacion],
                };
                let result = await db.query(query);
                return resolve(result);
            } catch (error) {
                console.log(error)
                reject(error);
            }
        })
    };

	static updateEstudiante(id, nombres, apellidos, edad, nro_identificacion) {
		return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: 'UPDATE estudiantes SET nombres=$2, apellidos=$3, edad=$4, nro_identificacion=$5 WHERE id = $1',
					values: [id, nombres, apellidos, edad, nro_identificacion],
				};
				let result = await db.query(query);
				return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}

    static deleteEstudiante(id) {
        return new Promise(async (resolve, reject)=>{
            try {
                let query = {
                    text:`DELETE FROM estudiantes WHERE id=$1`,
                    values:[id],
                };
                let result = await db.query(query);
                return resolve (result);
            } catch (error) {
                reject(error)
            }
        })
    }
};

export default Estudiantes;