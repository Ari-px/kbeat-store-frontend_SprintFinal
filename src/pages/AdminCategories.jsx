import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [editing, setEditing] = useState(null);

  const getCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await api.put(`/categories/${editing._id}`, form);
        toast.success("Categoría actualizada");
        setEditing(null);
      } else {
        await api.post("/categories", form);
        toast.success("Categoría creada");
      }

      setForm({
        name: "",
        description: "",
      });

      getCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al guardar categoría");
    }
  };

  const edit = (category) => {
    setEditing(category);

    setForm({
      name: category.name,
      description: category.description,
    });
  };

  const remove = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/categories/${id}`);
        toast.info("Categoría eliminada");
        getCategories();
      } catch (error) {
        toast.error("Error al eliminar categoría");
      }
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
      <section>
        <h1 className="text-4xl font-black mb-6">Admin categorías</h1>

        <form
          onSubmit={submit}
          className="bg-white text-slate-900 rounded-2xl p-4 shadow space-y-3"
        >
          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            placeholder="Nombre"
            className="w-full p-3 rounded-lg border"
            required
          />

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            placeholder="Descripción"
            className="w-full p-3 rounded-lg border"
            required
          />

          <button className="w-full bg-pink-600 text-white p-3 rounded-lg font-bold">
            {editing ? "Actualizar" : "Crear"}
          </button>
        </form>
      </section>

      <section className="space-y-3">
        {categories.map((category) => (
          <article
            key={category._id}
            className="bg-white text-slate-900 rounded-xl p-4 shadow flex justify-between"
          >
            <div>
              <h2 className="font-black">{category.name}</h2>
              <p>{category.description}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => edit(category)}
                className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
              >
                Editar
              </button>

              <button
                onClick={() => remove(category._id)}
                className="bg-red-600 text-white px-3 py-2 rounded-lg"
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default AdminCategories;
