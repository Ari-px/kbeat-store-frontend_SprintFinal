import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addFavorite } = useFavorites();

  return (
    <article className="bg-white text-slate-900 rounded-2xl shadow-md overflow-hidden border border-pink-100">
      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-4 space-y-3">
        <p className="text-sm text-pink-600 font-bold">{product.group}</p>

        <h3 className="text-xl font-black">{product.name}</h3>

        <p className="text-sm text-slate-600 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-lg font-black">${product.price}</span>
          <span className="text-sm">Stock: {product.stock}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Link
            to={`/products/${product._id}`}
            className="text-center bg-slate-900 text-white px-3 py-2 rounded-lg"
          >
            Ver
          </Link>

          <button
            onClick={() => addToCart(product._id)}
            className="bg-pink-600 text-white px-3 py-2 rounded-lg"
          >
            🛒
          </button>

          <button
            onClick={() => addFavorite(product._id)}
            className="bg-pink-100 px-3 py-2 rounded-lg"
          >
            ❤️
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
