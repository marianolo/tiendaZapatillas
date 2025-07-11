import React, { useState } from "react";
import axios from 'axios';

const URI = 'http://localhost:8000/products/';

export const Product = (props) => {
  const { id, nombre, precio, img1, img2, img3, stockMax, stockMin } = props.data;
  const [priceHook, setPrice] = useState(precio);
  const [maxStock, setMaxS] = useState(stockMax);
  const [minStock, setMinS] = useState(stockMin);
  const [message, setMessage] = useState(''); // Estado para mensajes de éxito o error

  const update = async (e) => {
    e.preventDefault();

    // Validaciones antes de enviar la actualización
    if (priceHook <= 0) {
      setMessage('El precio debe ser mayor que 0.');
      return;
    }
    if (maxStock <= 0) {
      setMessage('El stock máximo debe ser mayor que 0.');
      return;
    }
    if (minStock < 0) {
      setMessage('El stock mínimo no puede ser negativo.');
      return;
    }
    if (maxStock < minStock) {
      setMessage('El stock máximo debe ser mayor o igual al stock mínimo.');
      return;
    }

    try {
      await axios.put(URI + id + '/', { 
        precio: priceHook, 
        stockMax: maxStock, 
        stockMin: minStock 
      });
      setMessage('Producto actualizado correctamente'); // Mensaje de éxito
      props.refreshProducts(); // Refresca la lista de productos tras la edición
    } catch (error) {
      setMessage('Error al actualizar el producto'); // Mensaje de error
    }
  };

  const deleteProduct = async () => {
    const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}"?`);
    
    if (isConfirmed) {
      try {
        await axios.delete(URI + id);
        setMessage('Producto eliminado correctamente');
        props.refreshProducts(); // Refresca la lista de productos tras la eliminación
      } catch (error) {
        setMessage('Error al eliminar el producto');
      }
    }
  };

  return (
    <div className="product">
      <div className="slide-var">
        <ul>
          <li><img src={img1} alt={nombre} /></li>
          <li><img src={img2} alt={nombre} /></li>
          <li><img src={img3} alt={nombre} /></li>
        </ul>
      </div>
      <div className="description"> 
        <p><b>{nombre}</b></p>
        <p>Precio: ${precio}</p>
        <p>Stock Máximo: {stockMax}</p>
        <p>Stock Mínimo: {stockMin}</p>
        <form onSubmit={update}>
          <input 
            onChange={(e) => setPrice(Number(e.target.value))} 
            type="number" 
            placeholder="Nuevo Precio" 
            value={priceHook} 
          />
          <input 
            onChange={(e) => setMaxS(Number(e.target.value))} 
            type="number" 
            placeholder="Nuevo Stock Máximo" 
            value={maxStock} 
          />
          <input 
            onChange={(e) => setMinS(Number(e.target.value))} 
            type="number" 
            placeholder="Nuevo Stock Mínimo" 
            value={minStock} 
          />
          <input type="submit" className="btn-edit" value="Editar" />
        </form>
        <button onClick={deleteProduct} className="btn-delete">Eliminar</button>
        {message && <p>{message}</p>} {/* Muestra el mensaje si existe */}
      </div>
    </div> 
  );
};
