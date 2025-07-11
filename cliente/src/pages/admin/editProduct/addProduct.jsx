import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./addProduct.css";

const URI = 'http://localhost:8000/products/';

export const AddProduct = () => {
    const [name, setName] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [stockMax, setStockMax] = useState('');
    const [stockMin, setStockMin] = useState('');
    const [stock, setStock] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validaciones
        if (!name || !precio || !descripcion || !img1 || !stockMax || !stockMin || !stock) {
            alert("Todos los campos son obligatorios");
            return;
        }
    
        if (Number(precio) <= 0) {
            alert("El precio debe ser mayor que 0");
            return;
        }
    
        if (Number(stockMax) <= 0 || Number(stockMin) <= 0 || Number(stock) < 0) {
            alert("Los valores de stock máximo y mínimo deben ser mayores que 0. El stock actual no puede ser negativo.");
            return;
        }
    
        if (Number(stockMin) > Number(stockMax)) {
            alert("El stock mínimo no puede ser mayor que el stock máximo.");
            return;
        }
    
        const newProduct = {
            nombre: name,
            precio: Number(precio),
            descripcion,
            img1,
            img2,
            img3,
            stockMax: Number(stockMax),
            stockMin: Number(stockMin),
            stock: Number(stock),
        };
    
        try {
            await axios.post(URI, newProduct);
            alert("Producto añadido correctamente");
            window.location.reload();
        } catch (error) {
            console.log("Error al añadir el producto:", error);
            alert("Error al añadir el producto.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre del producto" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <input type="text" placeholder="URL 1 de la Imagen" value={img1} onChange={(e) => setImg1(e.target.value)} />
            <input type="text" placeholder="URL 2 de la Imagen" value={img2} onChange={(e) => setImg2(e.target.value)} />
            <input type="text" placeholder="URL 3 de la Imagen" value={img3} onChange={(e) => setImg3(e.target.value)} />
            <input type="number" placeholder="Stock máximo" value={stockMax} onChange={(e) => setStockMax(e.target.value)} />
            <input type="number" placeholder="Stock mínimo" value={stockMin} onChange={(e) => setStockMin(e.target.value)} />
            <input type="number" placeholder="Stock actual" value={stock} onChange={(e) => setStock(e.target.value)} />
            <button type="submit">Añadir Producto</button>
        </form>
    );
};
