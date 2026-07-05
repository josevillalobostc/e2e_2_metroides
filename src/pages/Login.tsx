import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    await api
      .post("/auth/login", data)
      .then((response) => {
        setError(null);
        localStorage.setItem("access_token", response.data.token);
        navigate("/dashboard");
      })
      .catch((e) => {
        setError(e.response.data.error);
      });
    setLoading(false);
  };

  return (
    <div className="bg-zinc-900 flex flex-col h-screen w-screen items-center justify-center">
      <label className="text-white text-4xl m-4">Uber</label>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col g-2 p-2 gap-2 bg-zinc-800 text-white shadow rounded-xl w-120"
      >
        <span className="p-2">Correo</span>
        <input
          className="appearance-none outline-none bg-zinc-900 rounded-md ring-2 ring-transparent focus:ring-blue-600 p-2"
          {...register("email", { required: "Es obligatorio poner un correo" })}
          placeholder="example@example.com"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <span className="p-2">Contraseña</span>
        <input
          className="appearance-none outline-none bg-zinc-900 rounded-md ring-2 ring-transparent focus:ring-blue-600 p-2"
          {...register("password", { required: "Coloque su contraseña" })}
          type="password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <button
          className="appearance-none outline-none bg-black rounded-md hover:cursor-pointer hover:bg-zinc-900 m-3 p-3"
          type="submit"
          disabled={loading}
        >
          Iniciar sesión
        </button>
        <label>{error}</label>
        <div className="flex flex-col items-center justify-between">
          <label>No tienes una cuenta?</label>
          <Link to="/register" className="text-blue-600 font-bold">
            Registrate ahora
          </Link>
        </div>
      </form>
    </div>
  );
}
