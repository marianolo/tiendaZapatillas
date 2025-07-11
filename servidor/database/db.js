import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Se conecta a la base de datos usando sequelize, con los parámetros desde variables de entorno
const db = new Sequelize(
    process.env.DB_NAME || 'tienda',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql'
    }
);

export { db };