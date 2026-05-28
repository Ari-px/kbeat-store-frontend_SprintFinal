import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    if (!user) return;

    try {
      const response = await api.get("/favorites");
      setFavorites(response.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addFavorite = async (productId) => {
    if (!user) {
      toast.error("Debés iniciar sesión para usar favoritos");
      return;
    }

    try {
      const response = await api.post(`/favorites/${productId}`);
      setFavorites(response.data.favorites.products || []);
      toast.success("Producto agregado a favoritos");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al agregar favorito");
    }
  };

  const removeFavorite = async (productId) => {
    try {
      const response = await api.delete(`/favorites/${productId}`);
      setFavorites(response.data.favorites.products || []);
      toast.info("Producto eliminado de favoritos");
    } catch (error) {
      toast.error("Error al eliminar favorito");
    }
  };

  useEffect(() => {
    getFavorites();
  }, [user]);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        getFavorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
