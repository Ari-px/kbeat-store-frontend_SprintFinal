import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <section className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
        
        {/* TEXTO */}
        <div className="space-y-8">
          <span className="inline-block bg-pink-100 text-pink-600 px-5 py-2 rounded-full font-bold text-sm shadow">
            Tienda K-pop
          </span>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Comprá tus álbumes favoritos en{" "}
            <span className="text-pink-600">
              KBeat Store
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            Aqui puedes encontrar todo lo de tus artistas Favoritos.
          </p>

          {/* BOTONES */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-pink-600 hover:bg-pink-700 transition text-white px-7 py-4 rounded-2xl font-bold shadow-lg"
            >
              Ver catálogo
            </Link>

          </div>

          {/* ESTADÍSTICAS */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="bg-white rounded-2xl shadow p-4 text-center">
              <h3 className="text-2xl font-black text-pink-600">
                500+
              </h3>

              <p className="text-sm text-slate-500">
                Álbumes
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 text-center">
              <h3 className="text-2xl font-black text-pink-600">
                100+
              </h3>

              <p className="text-sm text-slate-500">
                Artistas
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 text-center">
              <h3 className="text-2xl font-black text-pink-600">
                24/7
              </h3>

              <p className="text-sm text-slate-500">
                Online
              </p>
            </div>
          </div>
        </div>

        {/* IMAGEN */}
        <div className="relative flex justify-center items-center">
          
          {/* GLOW */}
          <div className="absolute w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

          {/* CARD FLOTANTE */}
          <div className="absolute -bottom-8 -left-4 bg-white shadow-xl rounded-2xl p-4 z-20">
            <p className="font-black text-lg">
              K-pop Albums 💿
            </p>

            <p className="text-sm text-slate-500">
              Merch + Photos + Accesorios
            </p>
          </div>

          {/* IMAGEN */}
          <img
            src="https://imgs.search.brave.com/xSdBmDGefrDCj8svPeVLRC4x1M3aKpYKQcLuVCAb9Bo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmVyaWtzdG9yZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjIvMTAvUGVyc29u/YWplc0JUMjFfQ2hp/bW15LmpwZw"
            alt="Kpop Album"
            className="relative z-10 w-[380px] md:w-[450px] rounded-[40px] shadow-2xl float-animation hover:scale-105 transition duration-500"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;