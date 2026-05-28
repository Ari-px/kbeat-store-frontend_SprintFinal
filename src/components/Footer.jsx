import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-24 overflow-hidden bg-slate-950 text-white">
      
      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-pink-600 opacity-20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        
        {/* TOP */}
        <section className="grid md:grid-cols-3 gap-12 border-b border-slate-800 pb-12">
          
          {/* LOGO */}
          <div className="space-y-5">
            <h2 className="text-4xl font-black">
              <span className="text-pink-500">
                KBeat
              </span>{" "}
              Store
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Tienda fullstack inspirada en el universo K-pop.
              Descubrí álbumes, ediciones especiales y tus
              artistas favoritos.
            </p>

            <div className="flex gap-3">
              <div className="bg-pink-600 px-4 py-2 rounded-full text-sm font-bold shadow">
                React
              </div>

              <div className="bg-purple-600 px-4 py-2 rounded-full text-sm font-bold shadow">
                Node.js
              </div>

              <div className="bg-emerald-600 px-4 py-2 rounded-full text-sm font-bold shadow">
                MongoDB
              </div>
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-xl font-black mb-5">
              Navegación
            </h3>

            <div className="flex flex-col gap-4 text-slate-400">
              <Link
                to="/"
                className="hover:text-pink-500 transition"
              >
                Inicio
              </Link>

              <Link
                to="/products"
                className="hover:text-pink-500 transition"
              >
                Catálogo
              </Link>

              <Link
                to="/favorites"
                className="hover:text-pink-500 transition"
              >
                Favoritos
              </Link>

              <Link
                to="/cart"
                className="hover:text-pink-500 transition"
              >
                Carrito
              </Link>
            </div>
          </div>

          {/* INFO */}
          <div>
            <h3 className="text-xl font-black mb-5">
              Sobre el proyecto
            </h3>

            <p className="text-slate-400 leading-relaxed mb-5">
              Proyecto desarrollado con autenticación JWT,
              CRUD completo, roles, rutas protegidas,
              carrito persistente y consumo de APIs externas.
            </p>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
              <p className="text-sm text-slate-300">
                💿 Más de 500 álbumes disponibles
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM */}
        <section className="pt-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          
          <p className="text-slate-500 text-sm">
            © 2026 KBeat Store — Ariana Espeche
          </p>

          <div className="flex gap-4 text-slate-400 text-sm">
            <span className="hover:text-pink-500 transition cursor-pointer">
              Instagram
            </span>

            <span className="hover:text-pink-500 transition cursor-pointer">
              TikTok
            </span>

            <span className="hover:text-pink-500 transition cursor-pointer">
              YouTube
            </span>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;