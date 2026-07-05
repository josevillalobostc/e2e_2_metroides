import { useEffect, useState } from "react";
import type { User } from "../types";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import DashboardPassenger from "./DashboardPassenger";
import DashboardDriver from "./DashboardDriver";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        navigate("/login");
      });
  }, []);

  if (user?.role === "PASSENGER") {
    return <DashboardPassenger user={user} />;
  } else if (user?.role === "DRIVER") {
    return <DashboardDriver user={user} />;
  } else {
    return <></>;
  }
}
