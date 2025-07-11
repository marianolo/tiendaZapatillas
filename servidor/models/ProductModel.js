import { db } from "../database/db.js"; // Se busca conectarse a la base de datos
import { DataTypes } from "sequelize"; // Tipo de datos para cada atributo de la base de datos

// El modelo de todos los productos extrayendo todos sus campos
const ProductModel = db.define('productos', {
    nombre: { type: DataTypes.STRING },
    precio: { type: DataTypes.DECIMAL(10, 2) }, // Cambiado de NUMBER a DECIMAL
    descripcion: { type: DataTypes.TEXT },
    img1: { type: DataTypes.TEXT('long') }, // Utiliza 'long' para LONGTEXT
    img2: { type: DataTypes.TEXT('long') },
    img3: { type: DataTypes.TEXT('long') },
    stockMax: { type: DataTypes.INTEGER },
    stockMin: { type: DataTypes.INTEGER },
    stock: { type: DataTypes.INTEGER }
}, {
    timestamps: true // Esto habilita automáticamente createdAt y updatedAt
});

export default ProductModel;
