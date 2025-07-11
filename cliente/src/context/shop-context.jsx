import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);
const URI = 'http://localhost:8000/products/';

const getDefaultCart = (products) => {
    let cart = {};
    products.forEach(product => {
        cart[product.id] = 0;
    });
    return cart;
};

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [payAumount, setPayAumount] = useState(0);
    const [products, setProducts] = useState([]);
    const [logged, setLogged] = useState(0);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI);
        setProducts(res.data);
        setCartItems(getDefaultCart(res.data));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.precio;
                }
            }
        }
        return totalAmount;
    };

    const addToCart = async (itemId) => {
        const itemInfo = products.find((product) => product.id === Number(itemId));
        if (!itemInfo || itemInfo.stock <= 0) {
            alert('Producto sin stock');
            return;
        }

        await axios.get(URI + 'book/' + itemId + '?f=book')
            .then(({ data }) => {
                if (data === 'Booked') {
                    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
                } else if (data === 'Stockout') {
                    alert('Producto agotado');
                }
            })
            .catch(error => console.log(error.message));
    };

    const removeFromCart = async (itemId) => {
        const itemInfo = products.find((product) => product.id === Number(itemId));
        if (itemInfo && cartItems[itemId] > 0) {
            await axios.get(URI + 'book/' + itemId + '?f=unbook')
                .then(({ data }) => {
                    if (data === 'Unbooked') {
                        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
                    }
                })
                .catch(error => console.log(error.message));
        }
    };

    const clearCart = () => {
        setCartItems(getDefaultCart(products));
    };

    // Nueva función para cerrar sesión
    const logout = () => {
        setLogged(0); // Reinicia el estado de logged
        setAdmin(false); // Reinicia el estado de admin
        localStorage.removeItem('userToken'); // Elimina el token guardado si existe
        alert('Sesión cerrada exitosamente');
    };

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        clearCart,
        loggedChanger: setLogged,
        logged,
        AdminChanger: setAdmin,
        admin,
        payAumount,
        setPayAumount,
        logout // Exportamos la función logout
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
