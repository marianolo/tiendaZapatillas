import Stripe from "stripe"; // Portal de pagos para conectarse a su API
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Clave de acceso de Stripe para recibir el pago
const striper = Stripe(process.env.STRIPE_SECRET_KEY);

// Función que permite conectarse a la API de Stripe y realizar los pagos
export const pay = async (req, res) => {
    console.log('Contenido de req.body:', req.body); // Asegurarnos de que req.body esté presente y loguear su contenido
    let { amount, id } = req.body; // Extraer los valores de amount e id de req.body

    try {
        const payment = await striper.paymentIntents.create({
            amount,
            currency: 'USD',
            description: 'shop',
            payment_method: id,
            confirm: true,
            return_url: `${process.env.BACKEND_URL}/payment/confirmation`,  // URL a la que el usuario será redirigido después del pago
        });

        console.log('payment', payment); // Loguear los detalles del pago
        res.json({
            message: 'payment successful',
            success: true
        });
    } catch (error) {
        console.log('error', error); // Loguear cualquier error que ocurra
        res.json({
            message: 'payment failed',
            success: false
        });
    }
};