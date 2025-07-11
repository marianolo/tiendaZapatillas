import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
import { ShopContext } from "../context/shop-context";

export const Navbar = () => {
    const context = useContext(ShopContext);
    const navigate = useNavigate(); // Para redirigir después del logout

    // Función para cerrar sesión
    const handleLogout = () => {
        context.logout(); // Llama a la función logout del contexto
        navigate("/login"); // Redirige al login
    };

    return (
        <div className="navbar">
            <div className="brand">
                <Link to="/" className="logo-link">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkZK0_0VW-8T-SH_PSO2IWDYj_m1_B63o_zg&s" 
                        alt="KickStreet Logo" 
                        className="logo-img" 
                    />
                    <span className="brand-name">KickStreet</span>
                </Link>
            </div>
            {!context.admin ? (
                !context.logged ? (
                    <div className="links">
                        <Link to="/">Shop</Link>
                        <Link to="/login">
                            <ShoppingCart size={32} />
                        </Link>
                    </div>
                ) : (
                    <div className="links">
                        <Link to="/shop">Shop</Link>
                        <Link to="/cart">
                            <ShoppingCart size={32} />
                        </Link>
                        {/* Botón de Cerrar Sesión */}
                        <button className="logout-button" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                )
            ) : (
                <div className="links">
                    <Link to="/editInventory">Products</Link>
                    <Link to="/editAdmin">Admin Profile</Link>
                    {/* Botón de Cerrar Sesión para admin */}
                    <button className="logout-button" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
};
