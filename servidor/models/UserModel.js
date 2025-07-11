import { db } from "../database/db.js"; // Se importa la conexión a la base de datos
import { DataTypes } from "sequelize"; // Tipo de datos de Sequelize

// El modelo de todos los usuarios extrayendo todos sus campos
const UserModel = db.define('users', {
    user_name: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    adress: { type: DataTypes.STRING },
    telephone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
}, {
    timestamps: true // Esto habilita automáticamente createdAt y updatedAt
});

export default UserModel;