import { useEffect, useState } from "react";
import api from "../api/axios";

const ProductForm = ({ onSubmit, initialData }) => {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    group: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    version: "Standard",
    category: "",
    rating: 0,
  });

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        group: initialData.group || "",
        description: initialData.description || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        image: initialData.image || "",
        version: initialData.version || "Standard",
        category: initialData.category?._id || initialData.category || "",
        rating: initialData.rating || 0,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
    });

    if (!initialData) {
      setForm({
        name: "",
        group: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        version: "Standard",
        category: "",
        rating: 0,
      });
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white text-slate-900 rounded-2xl p-4 shadow space-y-3"
    >
      <h2 className="font-black text-xl">
        {initialData ? "Editar producto" : "Crear producto"}
      </h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full p-3 rounded-lg border"
        required
      />

      <input
        name="group"
        value={form.group}
        onChange={handleChange}
        placeholder="Grupo / artista"
        className="w-full p-3 rounded-lg border"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full p-3 rounded-lg border"
        required
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        type="number"
        placeholder="Precio"
        className="w-full p-3 rounded-lg border"
        required
      />

      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        type="number"
        placeholder="Stock"
        className="w-full p-3 rounded-lg border"
        required
      />

      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="URL imagen"
        className="w-full p-3 rounded-lg border"
      />

      <input
        name="version"
        value={form.version}
        onChange={handleChange}
        placeholder="Versión"
        className="w-full p-3 rounded-lg border"
      />

      <input
        name="rating"
        value={form.rating}
        onChange={handleChange}
        type="number"
        min="0"
        max="5"
        step="0.1"
        placeholder="Rating"
        className="w-full p-3 rounded-lg border"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-3 rounded-lg border"
        required
      >
        <option value="">Seleccionar categoría</option>

        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button className="w-full bg-pink-600 text-white p-3 rounded-lg font-bold">
        Guardar
      </button>
    </form>
  );
};

export default ProductForm;