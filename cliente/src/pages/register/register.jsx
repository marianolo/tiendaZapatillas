import React, { useState, useEffect } from "react";
import './register.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const URI = 'http://localhost:8000/users/';

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [adress, setAdress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const res = await axios.get(URI);
        setUsers(res.data);
    };

    const validateFields = () => {
        // Validar campos vacíos
        if (!name || !password || !adress || !telephone || !email) {
            setErrorMessage("Todos los campos son obligatorios.");
            return false;
        }

        // Validar número de teléfono
        const phoneRegex = /^\d{10}$/; // Exactamente 10 dígitos
        if (!phoneRegex.test(telephone)) {
            setErrorMessage("El número de teléfono debe tener exactamente 10 dígitos.");
            return false;
        }

        // Validar correo electrónico con @gmail.com
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Debe terminar en @gmail.com
        if (!emailRegex.test(email)) {
            setErrorMessage("El correo electrónico debe ser válido y terminar en @gmail.com.");
            return false;
        }

        // Validar nombre de usuario duplicado
        if (users.some(user => user.user_name === name)) {
            setErrorMessage("El nombre de usuario ya existe. Por favor, elija otro.");
            return false;
        }

        // Validar email duplicado
        if (users.some(user => user.email === email)) {
            setErrorMessage("El correo electrónico ya está registrado. Por favor, use otro.");
            return false;
        }

        setErrorMessage(''); // Limpiar errores si todo está bien
        return true;
    };

    const store = async (e) => {
        e.preventDefault();

        // Validación de campos
        if (!validateFields()) return;

        // Enviar datos a la base de datos
        await axios.post(URI, {
            user_name: name,
            password: password,
            adress: adress,
            telephone: telephone,
            email: email,
        });

        setSuccessMessage('Usuario registrado exitosamente. Redirigiendo al login...');

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
            navigate(`/login`);
        }, 2000);
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={store}>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" 
                    name="user" 
                    id="user" 
                    placeholder="user"
                />
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    name="pass" 
                    id="pass" 
                    placeholder="password"
                />
                <input 
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    type="text" 
                    name="adress" 
                    id="adress" 
                    placeholder="adress"
                />
                <input 
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    type="text" 
                    name="telephone" 
                    id="telephone" 
                    placeholder="telephone"
                />
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text" 
                    name="email" 
                    id="email" 
                    placeholder="email"
                />
                <input type="submit" className="btn-login" value="Register" />
            </form>
            
            {/* Mostrar mensaje de éxito */}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {/* Mostrar mensaje de error */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Register;
