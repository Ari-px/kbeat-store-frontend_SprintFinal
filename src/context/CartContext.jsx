import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);

  const getCart = async () => {
    if (!user) return;

    const response = await api.get("/cart");
    setCart(response.data);
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error("Debés iniciar sesión para agregar al carrito");
      return;
    }

    const response = await api.post("/cart/add", { productId, quantity });
    setCart(response.data.cart);
    toast.success("Producto agregado al carrito");
  };

  const removeFromCart = async (productId) => {
    const response = await api.delete(`/cart/remove/${productId}`);
    setCart(response.data.cart);
    toast.info("Producto eliminado del carrito");
  };

  const clearCart = async () => {
    const response = await api.delete("/cart/clear");
    setCart(response.data.cart);
    toast.info("Carrito vaciado");
  };

  useEffect(() => {
    getCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, getCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
