import db from '../config/db.config.js'

class Registro {
    constructor(n_operacion, rut, n_cuenta, detalle_operacion, fecha, abonos, cargos) {
        this.n_operacion = n_operacion;
        this.rut = rut;
        this.n_cuenta = n_cuenta;
        this.detalle_operacion = detalle_operacion;
        this.fecha = fecha;
        this.abonos = abonos || 0;
        this.cargos = cargos || 0;
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
        console.log(n_operacion)
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
                    text: 'UPDATE registro_transacciones SET rut=$2, n_cuenta=$3, detalle_operacion=$4, abonos=$5, cargos=$6 WHERE n_operacion = $1',
					values: [n_operacion, rut, n_cuenta, detalle_operacion, abonos, cargos],
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

    static delete(n_operacion) {
        return new Promise(async (resolve, reject)=>{
            try {
                await db.query('BEGIN');
                let query = {
                    text:`DELETE FROM registro_transacciones WHERE n_operacion=$1`,
                    values:[n_operacion],
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