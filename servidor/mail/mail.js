import nodemailer from 'nodemailer'; // Se importa la librería nodemailer que permite el fácil envío de correos
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// El transportador, simplemente una receta de cocina en la cual SMTP protocolo simple de transferencia de correo
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Función que envía el correo con el contenido usando la librería de mailer
export const sendMail = (prod) => {
    transporter.sendMail({
        from: process.env.EMAIL_FROM || "ecommerce <lopezmarianop61@gmail.com>",
        to: process.env.EMAIL_TO || "lopezmarianop61@gmail.com",
        subject: "Stock en su mínimo",
        text: `El stock del siguiente producto con ID ${prod.id} está casi agotado.`
    })
    .then(console.info)
    .catch(console.error);
}