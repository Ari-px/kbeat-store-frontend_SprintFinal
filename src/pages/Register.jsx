import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser({
        ...data,
        role: "cliente",
      });

      navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-slate-900 rounded-2xl shadow p-6 space-y-4"
      >
        <h1 className="text-3xl font-black text-center">Crear cuenta</h1>

        <input
          {...register("name", { required: true })}
          placeholder="Nombre"
          className="w-full p-3 rounded-lg border"
        />

        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg border"
        />

        <input
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 rounded-lg border"
        />

        <button className="w-full bg-pink-600 text-white p-3 rounded-lg font-bold">
          Registrarme
        </button>

        <p className="text-center">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-pink-600 font-bold">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
