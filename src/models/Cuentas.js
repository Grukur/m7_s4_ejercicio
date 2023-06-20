import db from '../config/db.config.js'


class Cuenta {
    constructor(rut, n_cuenta, tipo, balance) {
        this.rut = rut;
        this.n_cuenta = n_cuenta;
        this.tipo = tipo;
        this.balance = balance;
    }

    static findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(
                    "SELECT rut, n_cuenta, tipo, balance FROM cuentas"
                );
                resolve(result);
            } catch (error) {
                console.log(error)
                reject(error)
            }
        });
    };

    static findBy(buscador) {
        console.log('buscador')
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(
                    "SELECT rut, n_cuenta, tipo, balance FROM cuentas WHERE n_cuenta::text = $1 OR rut::text = $1 OR tipo::text = $1",
                    [buscador]
                );
                return resolve(result);
            } catch (error) {
                console.log(error)
                reject(error)
            }
        });
    };

    create() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: `INSERT INTO cuentas(rut, n_cuenta, tipo, balance) VALUES($1,$2,$3) returning rut, n_cuenta, tipo`,
                    values: [this.rut, this.n_cuenta, this.tipo, this.balance],
                };
                let result = await db.query(query);
                return resolve(result);
            } catch (error) {
                console.log(error)
                reject(error);
            }
        })
    };

    static update(rut, n_cuenta, tipo, balance) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: 'UPDATE cuentas SET rut=$1, tipo=$3, balance=$4 WHERE n_cuenta = $2',
                    values: [rut, n_cuenta, tipo, balance],
                };
                let result = await db.query(query);
                return resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    static delete(n_cuenta) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: `DELETE FROM cuentas WHERE n_cuenta=$1`,
                    values: [n_cuenta],
                };
                let result = await db.query(query);
                return resolve(result);
            } catch (error) {
                reject(error)
            }
        })
    }

    static addBalance(balance, n_cuenta) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(
                    "UPDATE cuentas SET balance = balance + $1 WHERE n_cuenta = $2",
                    [balance, n_cuenta]
                );
                resolve(result.rows[0]);
            } catch (error) {
                reject('Error al abonar a la cuenta: ' + n_cuenta)
            }
        })
    }

    static subBalance(balance, n_cuenta) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(
                    "UPDATE cuentas SET balance = balance - $1 WHERE n_cuenta = $2",
                    [balance, n_cuenta]
                );
                resolve(result.rows[0]);
            } catch (error) {
                reject('Error al cargar contra la cuenta: ' + n_cuenta)
            }
        })
    }
};

export default Cuenta;