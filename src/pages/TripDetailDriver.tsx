import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Trip } from "../types";

export default function TripDetailDriver({ tripId }: { tripId: string }) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTrip = () => {
    api
      .get(`/trips/${tripId}`)
      .then((response) => setTrip(response.data))
      .catch((error) => setError(error.response?.data?.error));
  };

  useEffect(() => {
    fetchTrip();
  }, [tripId]);

  const handleComplete = () => {
    api
      .patch(`/trips/${tripId}/complete`)
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
        Pasajero: {trip.passenger.firstName} {trip.passenger.lastName}
      </label>

      {trip.status === "IN_PROGRESS" && (
        <button onClick={handleComplete} className="mt-4 bg-green-600 p-2 rounded-md text-white">
          Completar viaje
        </button>
      )}
    </div>
  );
}
