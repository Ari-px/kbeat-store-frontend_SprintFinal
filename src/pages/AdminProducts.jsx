import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductForm from "../components/ProductForm";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products?limit=50");

      setProducts(response.data.products || []);
    } catch (error) {
      console.log(error);
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = async (data) => {
    try {
      await api.post("/products", data);

      toast.success("Producto creado");
      getProducts();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Error al crear producto"
      );
    }
  };

  const updateProduct = async (data) => {
    if (!editing?._id) return;

    try {
      await api.put(`/products/${editing._id}`, data);

      toast.success("Producto actualizado");
      setEditing(null);
      getProducts();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Error al actualizar producto"
      );
    }
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/products/${id}`);

      toast.info("Producto eliminado");
      getProducts();
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar producto");
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-6">

      {/* FORMULARIO */}
      <section>
        <h1 className="text-4xl font-black mb-6">
          Admin productos
        </h1>

        <ProductForm
          initialData={editing}
          onSubmit={editing ? updateProduct : createProduct}
        />

        {editing && (
          <button
            onClick={() => setEditing(null)}
            className="mt-3 bg-slate-700 text-white px-4 py-2 rounded-lg"
          >
            Cancelar edición
          </button>
        )}
      </section>

      {/* LISTA */}
      <section className="space-y-3">

        {loading ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No hay productos</p>
        ) : (
          products.map((product) => (
            <article
              key={product._id}
              className="bg-white text-slate-900 rounded-xl p-4 shadow flex justify-between gap-4"
            >
              <div>
                <h2 className="font-black">{product.name}</h2>
                <p>
                  {product.group} - ${product.price}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(product)}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                >
                  Editar
                </button>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
};

export default AdminProducts;
  );
};

export default AdminProducts;
