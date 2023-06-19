import db from '../config/db.config.js'

class Registro {
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
                    text: "SELECT n_operacion, rut, n_cuenta, detalle_operacion, fecha, abonos, cargos, balance FROM registro_transacciones",
                    values: [],
                }
                let resultado = await db.query(query);
                return resolve(resultado);
            } catch (error) {
                reject(error)
            }
        });
    }

    static findBy(n_operacion) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "SELECT n_operacion, rut, n_cuenta, detalle_operacion, fecha, abonos, cargos, balance FROM registro_transacciones where n_operacion = $1",
                    values: [n_operacion],
                }
                let resultado = await db.query(query);
                return resolve(resultado);
            } catch (error) {
                reject(error)
            }
        });
    }

    create(rut, n_cuenta, detalle_operacion, abonos, cargos) {
        return new Promise(async (resolve, reject) => {
            try {
                await db.query('BEGIN');
                let resultado;
                if(abonos){
                    let query = {
                        text: `INSERT INTO registro_transacciones(rut, n_cuenta, detalle_operacion, abonos) VALUES($1,$2,$3,$4) returning n_operacion, rut, n_cuenta, detalle_operacion, fecha, abonos, cargos, balance`,
                        values: [rut, n_cuenta, detalle_operacion, abonos],
                    };
                    resultado = await db.query(query);                    
                }else if(cargos){
                    console.log('cargo')
                    let query = {
                        text: `INSERT INTO registro_transacciones(rut, n_cuenta, detalle_operacion, cargos) VALUES($1,$2,$3,$4) returning n_operacion, rut, n_cuenta, detalle_operacion, fecha, abonos, cargos, balance`,
                        values: [rut, n_cuenta, detalle_operacion, cargos],
                    };
                    resultado = await db.query(query);
                }
                await db.query('COMMIT');
                return resolve(resultado)
            } catch (error) {
                console.log(error)
                await db.query('ROLLBACK')
                reject(error)
            }
        })
    };

    static update(n_operacion, rut, n_cuenta, detalle_operacion, abonos, cargos, balance) {
		return new Promise(async (resolve, reject) => {
            try {
                await db.query('BEGIN');
                let query = {
                    text: 'UPDATE registro_transacciones SET rut=$2, n_cuenta=$3, detalle_operacion=$4, abonos=$5, cargos=$6, balance=$7 WHERE n_operacion = $1',
					values: [n_operacion, rut, n_cuenta, detalle_operacion, abonos, cargos, balance],
				};
				let resultado = await db.query(query);
                await db.query('COMMIT');
				return resolve(resultado);
			} catch (error) {
                await db.query('ROLLBACK')
				reject(error);
			}
		});
	}

    static delete(rut) {
        return new Promise(async (resolve, reject)=>{
            try {
                await db.query('BEGIN');
                let query = {
                    text:`DELETE FROM registro_transacciones WHERE rut=$1`,
                    values:[rut],
                };
                let resultado = await db.query(query);
                await db.query('COMMIT');
                return resolve (resultado);
            } catch (error) {
                await db.query('ROLLBACK');
                reject(error)
            }
        })
    }
};

export default Registro;