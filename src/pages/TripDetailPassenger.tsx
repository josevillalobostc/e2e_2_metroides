import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Trip } from "../types";
import { useForm } from "react-hook-form";

type RatingForm = {
  rating: string;
  comment: string;
};

export default function TripDetailPassenger({ tripId }: { tripId: string }) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<RatingForm>();

  const fetchTrip = () => {
    api
      .get(`/trips/${tripId}`)
      .then((response) => {
        setTrip(response.data);
      })
      .catch((error) => {
        setError(error.response?.data?.error);
      });
  };

  useEffect(() => {
    fetchTrip();
    const interval = setInterval(() => {
      setTrip((currentTrip) => {
        if (!currentTrip || currentTrip.status === "PENDING" || currentTrip.status === "IN_PROGRESS") {
          fetchTrip();
        }
        return currentTrip;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [tripId]);

  const onRate = (data: RatingForm) => {
    api
      .post(`/trips/${tripId}/rate`, { rating: parseInt(data.rating), comment: data.comment })
      .then(() => fetchTrip())
      .catch((e) => setError(e.response?.data?.error));
  };

  if (error) return <div className="text-white p-4">Error: {error}</div>;
  if (!trip) return <div className="text-white p-4">Cargando viaje...</div>;

  return (
    <div className="text-white p-4 flex flex-col gap-4 bg-zinc-800 rounded-xl w-120 m-2">
      <label className="text-2xl">Viaje #{trip.id}</label>
      <label>Estado: {trip.status}</label>
      <label>
        Ruta: {trip.pickupAddress} -{">"} {trip.dropoffAddress}
      </label>
      <label>
        Conductor: {trip.driver ? `${trip.driver.firstName} ${trip.driver.lastName} (Rating: ${trip.driver.rating})` : "buscando conductor..."}
      </label>

      {trip.status === "COMPLETED" && trip.passengerRating === null && (
        <form onSubmit={handleSubmit(onRate)} className="flex flex-col gap-2 mt-4">
          <label>Califica tu viaje</label>
          <select {...register("rating", { required: true })} className="p-2 bg-zinc-900 rounded-md">
            <option value="5">5 - Excelente</option>
            <option value="4">4 - Bueno</option>
            <option value="3">3 - Regular</option>
            <option value="2">2 - Malo</option>
            <option value="1">1 - Pésimo</option>
          </select>
          <input {...register("comment")} placeholder="Comentario" className="p-2 bg-zinc-900 rounded-md" />
          <button type="submit" className="bg-blue-600 p-2 rounded-md">Enviar calificacion</button>
        </form>
      )}

      {trip.passengerRating !== null && (
        <div className="mt-4">
          <label>Tu calificacion: {trip.passengerRating} {trip.ratingComment && `- "${trip.ratingComment}"`}</label>
        </div>
      )}
    </div>
  );
}
