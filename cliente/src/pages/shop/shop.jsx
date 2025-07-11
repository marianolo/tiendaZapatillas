import React, { useState, useEffect } from 'react';
import { Product } from './product';
import './shop.css';
import axios from 'axios';

const URI = 'http://localhost:8000/products/';

export const Shop = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');  // Estado para el término de búsqueda

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI);
        setProducts(res.data);
    }

    // Filtrar los productos basándose en el término de búsqueda
    const filteredProducts = products.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>KickStreet</h1>
            </div>

            {/* Campo de búsqueda */}
            <div className="search-bar">
                <input 
                    type="text"
                    placeholder="Buscar zapatillas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
                />
            </div>

            <div className="products">
                {/* Mostrar productos filtrados */}
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Product data={product} key={product.id} />
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}
            </div>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-socials">
                        <h4>Síguenos</h4>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    </div>
                    <div className="footer-contact">
                        <h4>Contáctanos</h4>
                        <p>Email: info@kickstreet.com</p>
                        <p>Teléfono: +123 456 7890</p>
                    </div>
                    <div className="footer-links">
                        <h4>Enlaces útiles</h4>
                        <a href="/politica-de-privacidad">Política de Privacidad</a>
                        <a href="/terminos-y-condiciones">Términos y Condiciones</a>
                        <a href="/envios">Información de Envíos</a>
                    </div>
                    <div className="footer-subscribe">
                        <h4>Suscríbete</h4>
                        <p>Recibe nuestras ofertas y novedades directamente en tu email.</p>
                        <input type="email" placeholder="Ingresa tu email" />
                        <button>Suscribirse</button>
                    </div>
                    <div className="footer-description">
                        <p>KickStreet - La mejor tienda de zapatillas y ropa urbana.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
