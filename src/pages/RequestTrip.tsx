import { useEffect, useState } from "react";
import type { Trip, User } from "../types";
import api from "../api/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type TripForm = {
  pickupAddress: string;
  dropoffAddress: string;
};

export default function RequestTrip() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripForm>();

  const [drivers, setDrivers] = useState<User[]>([]);
  useEffect(() => {
    api
      .get("/drivers/available")
      .then((response) => {
        setDrivers(response.data);
      })
      .catch(() => {});
  }, []);

  const onSubmit = (form: TripForm) => {
    setLoading(true);
    api
      .post("/trips", form)
      .then((response) => {
        navigate(`/trips/${response.data.id}`);
      })
      .catch((e) => {
        setError(e.response.data.error);
      });
  };

  return (
    <div>
      <label className="text-white">Conductores disponibles</label>
      <div className="overflow-y-auto p-2">
        {drivers.length === 0 ? (
          <p className="text-zinc-500 italic">No hay conductores disponibles</p>
        ) : (
          drivers.map((driver) => (
            <div
              key={driver.id}
              className="flex p-2 gap-3 bg-zinc-800 my-2 rounded-lg flex-row justify-between"
            >
              <span className="text-white font-bold">
                {driver.firstName} {driver.lastName}
              </span>
              <span className="text-emerald-400 font-bold">
                {driver.rating}
              </span>
            </div>
          ))
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col g-2 p-2 gap-2 bg-zinc-800 text-white shadow rounded-xl w-120"
      >
        <span className="p-2">Dirección de origen</span>
        <input
          className="appearance-none outline-none bg-zinc-900 rounded-md ring-2 ring-transparent focus:ring-blue-600 p-2"
          {...register("pickupAddress", { required: "Coloque una dirección" })}
          placeholder="Dirección de calle, distrito"
        />
        {errors.pickupAddress && (
          <span className="text-red-500">{errors.pickupAddress.message}</span>
        )}

        <span className="p-2">Dirección de destino</span>
        <input
          className="appearance-none outline-none bg-zinc-900 rounded-md ring-2 ring-transparent focus:ring-blue-600 p-2"
          {...register("dropoffAddress", { required: "Coloque una dirección" })}
          placeholder="Dirección de calle, distrito"
        />
        {errors.dropoffAddress && (
          <span className="text-red-500">{errors.dropoffAddress.message}</span>
        )}

        <button
          className="appearance-none outline-none bg-black rounded-md hover:cursor-pointer hover:bg-zinc-900 m-3 p-3"
          type="submit"
          disabled={loading}
        >
          Pedir viaje
        </button>
      </form>
      <label>Error al pedir el viaje: {error}</label>
    </div>
  );
}
