import { useEffect, useState } from "react";
import type { Trip, User } from "../types";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function DashboardDriver({ user }: { user: User }) {
  const [pendingTrips, setPendingTrips] = useState<Trip[]>([]);
  const [myTrips, setMyTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();

  const fetchTrips = () => {
    api
      .get("/trips/pending")
      .then((response) => setPendingTrips(response.data))
      .catch(() => {});
    api
      .get("/trips/my")
      .then((response) => setMyTrips(response.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleAccept = (tripId: number) => {
    api
      .patch(`/trips/${tripId}/accept`)
      .then(() => {
        navigate(`/trips/${tripId}`);
      })
      .catch((e) => alert(e.response?.data?.error));
  };

  const activeTrip = myTrips.find((t) => t.status === "IN_PROGRESS");

  return (
    <div className="text-white p-2 m-2 flex flex-col">
      <label className="text-xl mb-4">
        Bienvenido, {user.firstName} (Rating: {user.rating})
      </label>

      {activeTrip && (
        <div
          className="bg-zinc-800 p-4 mb-4 rounded-xl cursor-pointer"
          onClick={() => navigate(`/trips/${activeTrip.id}`)}
        >
          <label>Tienes un viaje en curso</label>
          <p>
            {activeTrip.pickupAddress} -{">"} {activeTrip.dropoffAddress}
          </p>
        </div>
      )}

      <label className="text-lg mb-2">Viajes Pendientes</label>
      <div className="flex flex-col gap-2">
        {pendingTrips.length === 0 ? (
          <label>No hay viajes pendientes</label>
        ) : (
          pendingTrips.map((trip) => (
            <div
              key={trip.id}
              className="p-4 bg-zinc-800 rounded-lg flex justify-between"
            >
              <div>
                <p>Pasajero: {trip.passenger.firstName}</p>
                <p>
                  {trip.pickupAddress} -{">"} {trip.dropoffAddress}
                </p>
              </div>
              <button
                onClick={() => handleAccept(trip.id)}
                disabled={!user.available}
                className="bg-blue-600 p-2 rounded-md hover:cursor-pointer hover:bg-blue-500"
              >
                Aceptar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
