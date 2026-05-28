import { useFavorites } from "../context/FavoriteContext";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-6">Mis favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tenés favoritos todavía.</p>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Favorites;