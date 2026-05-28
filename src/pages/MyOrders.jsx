import { useEffect, useState } from "react";
import api from "../api/axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await api.get("/orders/my-orders");
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-6">Mis pedidos</h1>

      {orders.length === 0 ? (
        <p>No realizaste pedidos todavía.</p>
      ) : (
        <section className="space-y-4">
          {orders.map((order) => (
            <article
              key={order._id}
              className="bg-white text-slate-900 rounded-xl p-4 shadow"
            >
              <h2 className="font-black">Pedido #{order._id.slice(-6)}</h2>
              <p>Estado: {order.status}</p>
              <p>Total: ${order.total}</p>
              <p>Productos: {order.products.length}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default MyOrders;
