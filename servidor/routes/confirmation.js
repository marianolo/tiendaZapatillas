import express from 'express';

const router = express.Router();

router.get('/confirmation', (req, res) => {
    // Aquí puedes manejar la lógica para mostrar el estado del pago
    const { payment_intent, payment_intent_client_secret, redirect_status } = req.query;

    if (redirect_status === 'succeeded') {
        res.send('El pago ha sido exitoso!');
    } else {
        res.send('El pago ha fallado o ha sido cancelado.');
    }
});

export default router;
