import nodemailer from 'nodemailer'; // Se importa la librería nodemailer que permite el fácil envío de correos

// El transportador, simplemente una receta de cocina en la cual SMTP protocolo simple de transferencia de correo
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'lopezagueromariano61@gmail.com',
        pass: 'pmkgxvmpxzviyyur'
    }
});

// Función que envía el correo con el contenido usando la librería de mailer
export const sendMail = (prod) => {
    transporter.sendMail({
        from: "ecommerce <lopezmarianop61@gmail.com>",
        to: "lopezmarianop61@gmail.com",
        subject: "Stock en su mínimo",
        text: `El stock del siguiente producto con ID ${prod.id} está casi agotado.`
    })
    .then(console.info)
    .catch(console.error);
}
