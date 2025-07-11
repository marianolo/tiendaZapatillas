import React from 'react';
import { Product } from './productAddtoCart';
import './shopAddtoCart.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'http://localhost:8000/products/'; //aqui se hacen las peticiones 

export const ShopAddtoCart = () => {
    const [products, setProducts] = useState([]); // Todos los productos
    const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        // Filtrar productos cuando cambie el término de búsqueda
        if (searchTerm === '') {
            setFilteredProducts(products); // Si no hay búsqueda, mostrar todos
        } else {
            const filtered = products.filter((product) =>
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por nombre
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    const getProducts = async () => {
        const res = await axios.get(URI);
        setProducts(res.data);
        setFilteredProducts(res.data); // Inicialmente mostrar todos
    };

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>KickStreet</h1>
            </div>

            {/* Campo de búsqueda */}
            <div className="searchBar">
                <input 
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Lista de productos filtrados */}
            <div className="products">
                {filteredProducts.map((product) => (
                    <Product data={product} key={product.id} />
                ))}
            </div>
        </div>
    );
};