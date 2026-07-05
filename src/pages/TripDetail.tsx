import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get(`/trips/${id}`)
      .then((response) => {
        setTrip(response.data);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, []);

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }
}
