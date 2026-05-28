import { useCart } from "../context/CartContext";
import api from "../api/axios";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, getCart, removeFromCart, clearCart } = useCart();

  const createOrder = async () => {
    try {
      await api.post("/orders");
      toast.success("Pedido creado correctamente");
      getCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear pedido");
    }
  };

  if (!cart) {
    return <p className="p-8">Cargando carrito...</p>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-6">Mi carrito</h1>

      {cart.products.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <section className="space-y-4">
          {cart.products.map((item) => (
            <article
              key={item.product._id}
              className="bg-white text-slate-900 rounded-xl p-4 shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-black">{item.product.name}</h2>
                <p>Cantidad: {item.quantity}</p>
                <p>${item.product.price}</p>
              </div>

              <button
                onClick={() => removeFromCart(item.product._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Eliminar
              </button>
            </article>
          ))}

          <div className="bg-pink-100 text-slate-900 p-4 rounded-xl flex justify-between items-center">
            <h2 className="text-2xl font-black">Total: ${cart.total}</h2>

            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg"
              >
                Vaciar
              </button>

              <button
                onClick={createOrder}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg"
              >
                Confirmar pedido
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Cart;