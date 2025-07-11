import React from 'react';
import { Product } from './Product';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./editProduct.css";

const URI = 'http://localhost:8000/products/'; // Aquí se hacen las peticiones

export const EditProduct = () => {
  const [products, setProducts] = useState([]); // Aquí se guardan los productos
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(URI);
      setProducts(res.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      alert("Hubo un problema al cargar los productos. Inténtalo de nuevo más tarde.");
    }
  };

  // Redirige al formulario para añadir un nuevo producto
  const handleAddNewProduct = () => {
    const isConfirmed = window.confirm("¿Quieres agregar un nuevo producto?");
    if (isConfirmed) {
      navigate('/add-product');
    }
  };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Edit Products</h1>
        <button 
          onClick={handleAddNewProduct} 
          className="btn-add-product">
          Añadir Nuevo Producto
        </button>
      </div>
      <div className="products"> 
        {products.length > 0 ? (
          products.map((product) => (
            <Product key={product.id} data={product} refreshProducts={getProduct} />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};
