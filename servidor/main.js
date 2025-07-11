import dotenv from 'dotenv';
// Cargar variables de entorno ANTES de importar otros módulos
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import Express from 'express';//conexion con la api
import cors from 'cors';//Intercambio de recursos de origen cruzado, permite evitar errores
import { db } from "./database/db.js";//conexion base de datos
import productRoutes from './routes/routesProducts.js';//rutas de los productos
import userRoutes from './routes/routesUser.js';//rutas de los usuarios
import ProductModel from './models/ProductModel.js';//modelo de los productos
import {pay} from './routes/pay.js';//ruta para pagar
import confirmationRoutes from './routes/confirmation.js';

const app = Express();//la app se conecta con express

app.use(cors());//prevenir fallas de conexcion
app.use(Express.json());//permite obtener el paquete express en un json
app.use('/products', productRoutes);//se generalizan las rutas de los productso
app.use('/users', userRoutes);//se generalizan las rutas de los usuarios
app.use('/payment',pay);//se generalizan las rutas de los pagos
app.use('/payment', confirmationRoutes);

//se busca conectarse a la base de datos
// Función asincrónica para autenticar la base de datos
const authenticateDB = async () => {
    try {
        await db.authenticate();
        console.log('Conexion exitosa a la DB');
    } catch (error) {
        console.log(`El error de conexion es: ${error}`);
    }
};

// Llama a la función 
authenticateDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server UP running in http://localhost:${PORT}/`);
});

//usando el modelo de productos, encuentra a todos los productos y devuelve sus correspondientes atributos y se guarda en el objeto en products
const products = await ProductModel.findAll({
    attributes: ['id', 'stock', 'stockMin', 'nombre']
})

let productsStock = {}//objeto para guardar el stock minmo de los productos
let productMinStock = {}//objeto para guardar el stock minimo de los productos

//para cada producto obtenido, 
products.forEach(product => {
    productsStock[product.dataValues.id] = product.dataValues.stock;//se le asigna el id correspondiente al producto y a su vez el valor del stock en forma de objeto
});
products.forEach(product => {
    productMinStock[product.dataValues.id] = {stockMin: product.dataValues.stockMin, nombre: product.dataValues.nombre};//se le asigna el id correspondiente al producto y a su vez el valor minimo del stock en forma de objeto, junto con el nomrbe
});
console.log(productMinStock);
export {productsStock, productMinStock};//exportation de los objetos