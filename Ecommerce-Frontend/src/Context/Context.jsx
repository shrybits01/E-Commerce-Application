import axios from "../axios";
import { useState, useEffect, createContext } from "react";

const AppContext = createContext({
  data: [],
  isError: "",
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  refreshData:() =>{},
  updateStockQuantity: (productId, newQuantity) =>{}
  
});

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);


  const addToCart = (product) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const existingProduct = cart.find(item => item.id === product.id);

  let updatedCart;

  if (existingProduct) {
    if (existingProduct.quantity >= 7) {
      alert('Maximum 7 items of this product allowed!');
      return;
    }
    if (totalItems >= 7) {
      alert('Maximum 7 items total in cart! Current: ' + totalItems);
      return;
    }
    updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    if (totalItems >= 7) {
      alert('Maximum 7 items allowed in cart! Remove some items first.');
      return;
    }
    updatedCart = [...cart, { ...product, quantity: 1 }];
  }

  setCart(updatedCart);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

  const removeFromCart = (productId) => {
    console.log("productID",productId)
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log("CART",cart)
  };

  const refreshData = async () => {
    try {
      const response = await axios.get("/products");
      setData(response.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  const clearCart =() =>{
    setCart([]);
  }
  
  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  return (
    <AppContext.Provider value={{ data, isError, cart, addToCart, removeFromCart,refreshData, clearCart  }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;