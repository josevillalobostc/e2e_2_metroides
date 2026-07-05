import { useEffect, useState } from "react";
import type { Trip, User } from "../types";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function DashboardPassenger({ user }: { user: User }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("/trips")
      .then((response) => {
        setTrips(response.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="text-white p-2 m-2 flex flex-col bg-zinc-800 rounded-2xl">
      <label className="text-xl">
        {`A donde quieres ir hoy, ${user.firstName}?`}{" "}
      </label>
      <label>Lista de viajes</label>
      {trips.length === 0 ? (
        <p className="text-zinc-500 italic">No tienes viajes aún</p>
      ) : (
        trips.map((trip) => (
          <div key={trip.id} className="p-4 bg-zinc-800 my-2 rounded-lg">
            <p>
              {trip.pickupAddress} {"->"} {trip.dropoffAddress}
            </p>
            <span className="text-emerald-400 font-bold">{trip.status}</span>
          </div>
        ))
      )}

      <button
        className="appearance-none outline-none bg-black rounded-md hover:cursor-pointer hover:bg-zinc-900 m-3 p-3"
        onClick={() => {
          navigate("/request-trip");
        }}
      >
        Solicitar nuevo viaje
      </button>
    </div>
  );
}
