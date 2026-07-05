import { useEffect, useState } from "react";
import type { Trip, User } from "../types";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Historial() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        const currentUser = response.data;
        setUser(currentUser);
        const endpoint = currentUser.role === "PASSENGER" ? "/trips" : "/trips/my";
        return api.get(endpoint);
      })
      .then((response) => {
        setTrips(response.data);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  if (!user) return <div className="text-white p-4">Cargando...</div>;

  return (
    <div className="text-white p-2 m-2 flex flex-col">
      <label className="text-xl mb-4">Historial de Viajes</label>
      
      <div className="flex flex-col gap-2">
        {trips.length === 0 ? (
          <label>No hay viajes en tu historial</label>
        ) : (
          trips.map((trip) => (
            <div key={trip.id} className="p-4 bg-zinc-800 rounded-lg flex justify-between cursor-pointer" onClick={() => navigate(`/trips/${trip.id}`)}>
              <div>
                <p>{trip.pickupAddress} -{">"} {trip.dropoffAddress}</p>
                <p className="text-gray-400 text-sm">Fecha: {new Date(trip.requestedAt).toLocaleString()}</p>
              </div>
              <label>{trip.status}</label>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
