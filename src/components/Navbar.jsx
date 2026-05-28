import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { dark, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-pink-600 font-bold"
      : "hover:text-pink-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-white/90 text-slate-900 backdrop-blur border-b border-pink-100">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-4 items-center justify-between">
        <Link to="/" className="text-2xl font-black text-pink-600">
          KBeat Store
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <NavLink to="/products" className={linkClass}>
            Catálogo
          </NavLink>

          {user && (
            <>
              <NavLink to="/favorites" className={linkClass}>
                Favoritos
              </NavLink>

              <NavLink to="/cart" className={linkClass}>
                Carrito
              </NavLink>

              <NavLink to="/orders" className={linkClass}>
                Pedidos
              </NavLink>
            </>
          )}

          {isAdmin && (
            <>
              <NavLink to="/admin/products" className={linkClass}>
                Admin productos
              </NavLink>

              <NavLink to="/admin/categories" className={linkClass}>
                Admin categorías
              </NavLink>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg bg-slate-200"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {user ? (
            <button
              onClick={logout}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg"
            >
              Salir
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-pink-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;