CREATE TABLE usuarios (
    rut VARCHAR(11) PRIMARY KEY NOT NULL UNIQUE,
    clave VARCHAR(12) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefono VARCHAR(15),
    CONSTRAINT chk_clave CHECK (LENGTH(clave) >= 8)
);

CREATE TABLE cuentas (
    rut VARCHAR(11) NOT NULL REFERENCES usuarios(rut),
    n_cuenta INTEGER PRIMARY KEY NOT NULL,
    tipo VARCHAR(30) NOT NULL
);

//hay que correr este comando antes de la creacion 
//de la tabla registro_transacciones, por el uso de uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE registro_transacciones (
    n_operacion UUID DEFAULT uuid_generate_v4(),
    rut VARCHAR(12) NOT NULL REFERENCES usuarios(rut),
    n_cuenta INTEGER NOT NULL REFERENCES cuentas(n_cuenta),
    detalle_operacion VARCHAR(30) DEFAULT 'No especifica',
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    abonos MONEY DEFAULT 0,
    cargos MONEY DEFAULT 0,
    balance MONEY GENERATED ALWAYS AS (abonos - cargos) STORED NOT NULL
);

alter table usuarios alter column clave type text;

insert into 
usuarios(rut, clave, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, email, telefono) 
values 
(
'13000111-5', 
'123456789', 
'Jorge', 
'Samu', 
'Romo', 
'12/01/1980', 
'jorge@gmail.com', 
'977778888'
),
(
'14000111-5', 
'123456789', 
'Carlos', 
'Samu', 
'Romo', 
'11/01/1985', 
'carlos@gmail.com', 
'977775555'
),
(
'10000111-8', 
'123456789', 
'Jennifer', 
'Samu', 
'Romo', 
'12/01/1990', 
'jensam@gmail.com', 
'900008888'
),
(
'17000111-5', 
'123456789', 
'Josefine', 
'Samu', 
'Romo', 
'10/01/1995', 
'jorom@gmail.com', 
'944447777'
)

select * from cuentas;

insert into cuentas(rut, n_cuenta, tipo)
values
(
	'13000111-5', '0000405', 'dolares'
),
(
	'17000111-5', '000015', 'corriente'
),
(
	'17000111-5', '000115', 'vista'
),
(
	'10000111-8', '000010', 'corriente'
),
(
	'10000111-8', '000110', 'vista'
),
(
	'13000111-5', '000005', 'corriente'
),
(
	'13000111-5', '0000105', 'vista'
)

select * from cuentas;
select * from usuarios;
select * from registro_transacciones;

--paso 1: Primero dropeamos el seteo default
ALTER TABLE registro_transacciones
ALTER COLUMN n_operacion DROP DEFAULT;

--paso 2: Luego creamos el nuevo tipo y seteo default
ALTER TABLE registro_transacciones
ALTER COLUMN n_operacion TYPE VARCHAR(6)
    USING substr(uuid_generate_v4()::text, 1, 6);
	
--paso 3: agregamos un nuevo constraint
ALTER TABLE registro_transacciones
ALTER COLUMN n_operacion SET DEFAULT substr(uuid_generate_v4()::text, 1, 6);

--Agregamos la columna Balance a la tabla cuentas
ALTER TABLE cuentas
ADD COLUMN balance MONEY DEFAULT 0;
