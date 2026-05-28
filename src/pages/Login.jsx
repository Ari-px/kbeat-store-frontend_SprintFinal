import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const user = await login(data);

      if (user.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/products");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-slate-900 rounded-2xl shadow p-6 space-y-4"
      >
        <h1 className="text-3xl font-black text-center">Iniciar sesión</h1>

        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg border"
        />

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 rounded-lg border"
        />

        <button className="w-full bg-pink-600 text-white p-3 rounded-lg font-bold">
          Entrar
        </button>

        <p className="text-center">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-pink-600 font-bold">
            Registrate
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
