import React from "react";
import './login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";

const URI = 'http://localhost:8000/users/';

const Login = () => {
    const context = useContext(ShopContext);
    const navigate = useNavigate();

    const navigateRegister = () => {
        navigate(`/register`);
    }

    const navigateLogin = () => {
        navigate(`/login`);
    }

    const navigateShopAddtoCart = () => {
        navigate(`/shop`);
    }

    const navigateEditInventory = () => {
        navigate(`/editInventory`);
    }

    const [entrada, setEntrada] = useState(''); 
    const [entradaP, setEntradaP] = useState('');
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const res = await axios.get(URI);
        setUsers(res.data);
    }

    const compare = () => {
        return users.find(e => e.user_name === entrada && e.password === entradaP) ? true : false;
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir comportamiento por defecto

        if (compare()) {
            setErrorMessage(''); // Limpia el mensaje de error si el login es exitoso
            if (entrada === 'admin') {
                navigateEditInventory(); // Redirige al editor de inventario
                context.AdminChanger(true); // Habilita el estado de admin en el contexto
            } else {
                navigateShopAddtoCart(); // Redirige al carrito o tienda
            }
            context.loggedChanger(true); // Cambia el estado de login a true
        } else {
            setErrorMessage('Usuario o contraseña incorrectos'); // Mensaje de error
        }
    }

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    value={entrada} 
                    onChange={(e) => setEntrada(e.target.value)}
                    type="text" name="user" id="user" placeholder="user" />
                <input 
                    value={entradaP} 
                    onChange={(e) => setEntradaP((e.target.value))}  
                    type="password" name="pass" id="pass" placeholder="password" />
                <input type="submit" className="btn-login" value="Login" />
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Muestra el mensaje de error */}
            <div className="btn-register" onClick={navigateRegister}>Register</div>
        </div>
    )
}

export default Login;
