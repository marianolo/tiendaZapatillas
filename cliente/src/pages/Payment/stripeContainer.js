import React from 'react';
import {Elements} from "@stripe/react-stripe-js";//se llama elements para stripe
import { loadStripe } from '@stripe/stripe-js'; //se llama loadstripe
import PaymentForm from './PaymentForm';

const PUBLIC_KEY="pk_test_51PrWa5P1kZZ4pJ7rIgpPlHIYHqLMGXYk48iBuNa44hcbwNvrNwPjA3wYHZKKChfiMJMaj8OtOr61rzf29UVwVyhj00W5DYnj9e" //se coloca la llave publica

const stripeTestPromise = loadStripe(PUBLIC_KEY); //se crea una variable en la que se almacena la key

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>{/*se llama al elemento al formulario de del pago  */}
                <PaymentForm/>
        </Elements>
    )
}