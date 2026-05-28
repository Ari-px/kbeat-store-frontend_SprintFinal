import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const getProducts = async () => {
    try {
      const response = await api.get(
        `/products?search=${search}&page=${page}&limit=8`
      );

      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getProducts();
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-8 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black">Catálogo de CDs</h1>
          <p className="text-slate-600">
            Buscá por álbum, grupo o artista.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar BTS, BLACKPINK..."
            className="p-3 rounded-lg border text-slate-900"
          />

          <button className="bg-pink-600 text-white px-5 rounded-lg">
            Buscar
          </button>
        </form>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 disabled:opacity-40"
        >
          Anterior
        </button>

        <span>
          Página {pagination.currentPage || 1} de {pagination.totalPages || 1}
        </span>

        <button
          disabled={page >= pagination.totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
};

export default Products;
