import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    await api
      .post("/auth/register", data)
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
        className="flex flex-col g-2 p-2 gap-2 tems-center bg-zinc-800 text-white shadow rounded-xl w-120"
      >
        <span className="p-2">Nombres</span>
        <input
          className="appearance-none outline-none bg-zinc-900 rounded-md ring-2 ring-transparent focus:ring-blue-600 p-2"
          {...register("firstName", { required: "Coloque su nombre" })}
          placeholder="Rodrigo"
        />
        {errors.firstName && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}
        <span className="p-2">Apellidos</span>
        <input
          className="appearance-none outline-none bg-zinc-900 rounded-md ring-2 ring-transparent focus:ring-blue-600 p-2"
          {...register("lastName", { required: "Coloque sus apellidos" })}
          placeholder="Rodriguez"
        />
        {errors.lastName && (
          <span className="text-red-500">{errors.lastName.message}</span>
        )}
        <span className="p-2">Correo</span>
        <input
          className="appearance-none outline-none bg-zinc-900 rounded-md ring-2 ring-transparent focus:ring-blue-600 p-2"
          {...register("email", { required: "Coloque un correo" })}
          placeholder="example@example.com"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <span className="p-2">Contraseña</span>
        <input
          className="appearance-none outline-none bg-zinc-900 rounded-md ring-2 ring-transparent focus:ring-blue-600 p-2"
          {...register("password", {
            required: "Coloque una contraseña de 6 dígitos o más",
            minLength: 6,
          })}
          type="password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <span className="p-2">Rol</span>
        <select
          {...register("role", { required: "Seleccione un rol" })}
          className="appearance-none outline-none bg-zinc-900 rounded-md ring-2 ring-transparent focus:ring-blue-600 p-2"
        >
          <option value="PASSENGER">Pasajero</option>
          <option value="DRIVER">Conductor</option>
        </select>
        {errors.role && (
          <span className="text-red-500">{errors.role.message}</span>
        )}
        <button
          className="appearance-none outline-none bg-black rounded-md hover:cursor-pointer hover:bg-zinc-900 m-3 p-3"
          type="submit"
          disabled={loading}
        >
          Crear cuenta
        </button>
        <div className="flex flex-col items-center justify-between">
          <label>Ya tienes cuenta?</label>
          <Link to="/login" className="text-blue-600 font-bold">
            Inicia sesión
          </Link>
        </div>

        <label>{error}</label>
      </form>
    </div>
  );
}
