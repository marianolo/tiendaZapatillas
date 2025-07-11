import Stripe from "stripe"; // Portal de pagos para conectarse a su API

// Clave de acceso de Stripe para recibir el pago
const striper = Stripe('sk_test_51PrWa5P1kZZ4pJ7r0T9olwhWKsxG9Pn9G7buqfV7GYyczQJIrc6MzDciu9Un5jN7je2WudCPM4bd4IlZH7l08ggD007fV71GYs');

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
            return_url: 'http://localhost:8000/payment/confirmation',  // URL a la que el usuario será redirigido después del pago
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
