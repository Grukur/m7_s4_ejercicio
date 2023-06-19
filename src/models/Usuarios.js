import db from '../config/db.config.js'

class Usuarios {
    constructor(rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono) {
        this.rut = rut;
        this.clave = clave;
        this.nombre = nombre;
        this.primer_apellido = primer_apellido;
        this.segundo_apellido = segundo_apellido;
        this.fecha_nacimiento = fecha_nacimiento;
        this.email = email;
        this.telefono = telefono;
    }

    static findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "SELECT rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono FROM usuarios",
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
                    text: "SELECT rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono FROM usuarios where rut = $1",
                    values: [id],
                }
                let resultado = await db.query(query);
                return resolve(resultado);
            } catch (error) {
                reject(error)
            }
        });
    }

    create() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: `INSERT INTO Usuarios(rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono) VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono`,
                    values: [this.rut, this.clave, this.nombre, this.primer_apellido, this.segundo_apellido, this.fecha_nacimiento, this.email, this.telefono],
                };
                let resultado = await db.query(query);
                return resolve(resultado);
            } catch (error) {
                console.log(error)
                reject(error);
            }
        })
    };

    static update(rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono) {
		return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: 'UPDATE Usuarios SET clave=$2, nombre=$3, primer_apellido=$4, segundo_apellido=$5, fecha_nacimiento=$6, email=$7, telefono=$8 WHERE rut = $1',
					values: [rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono],
				};
				let resultado = await db.query(query);
                console.log(resultado)
				return resolve(resultado);
			} catch (error) {
				reject(error);
			}
		});
	}

    static delete(rut) {
        return new Promise(async (resolve, reject)=>{
            try {
                let query = {
                    text:`DELETE FROM Usuarios WHERE rut=$1`,
                    values:[rut],
                };
                let resultado = await db.query(query);
                return resolve (resultado);
            } catch (error) {
                reject(error)
            }
        })
    }
};

export default Usuarios;