import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { User } from "../types";
import TripDetailPassenger from "./TripDetailPassenger";
import TripDetailDriver from "./TripDetailDriver";

export default function TripDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  if (!user || !id) return <div className="text-white p-4">Cargando...</div>;

  if (user.role === "PASSENGER") {
    return <TripDetailPassenger tripId={id} />;
  } else {
    return <TripDetailDriver tripId={id} />;
  }
}
