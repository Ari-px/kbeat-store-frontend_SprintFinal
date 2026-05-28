import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addFavorite } = useFavorites();

  const [product, setProduct] = useState(null);
  const [externalAlbums, setExternalAlbums] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);

        const external = await api.get(`/external/itunes/${response.data.group}`);
        setExternalAlbums(external.data.results || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return <p className="p-8">Cargando producto...</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <section className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-3xl w-full object-cover shadow"
        />

        <div className="space-y-4">
          <span className="text-pink-500 font-bold">{product.group}</span>

          <h1 className="text-5xl font-black">{product.name}</h1>

          <p className="text-slate-600">{product.description}</p>

          <p>Categoría: {product.category?.name}</p>
          <p>Versión: {product.version}</p>
          <p>Rating: ⭐ {product.rating}</p>
          <p>Vistas: {product.views}</p>

          <p className="text-3xl font-black">${product.price}</p>

          <div className="flex gap-3">
            <button
              onClick={() => addToCart(product._id)}
              className="bg-pink-600 text-white px-5 py-3 rounded-lg font-bold"
            >
              Agregar al carrito
            </button>

            <button
              onClick={() => addFavorite(product._id)}
              className="bg-pink-100 text-slate-900 px-5 py-3 rounded-lg font-bold"
            >
              Agregar favorito
            </button>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black mb-4">
          Datos externos desde iTunes
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {externalAlbums.map((album) => (
            <article
              key={album.collectionId}
              className="bg-white text-slate-900 p-4 rounded-xl shadow"
            >
              <img
                src={album.artworkUrl100}
                alt={album.collectionName}
                className="w-24 h-24 rounded-lg"
              />

              <h3 className="font-bold mt-2">{album.collectionName}</h3>
              <p className="text-sm text-slate-500">{album.artistName}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
