import { Outlet, Link, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center">
      <nav className="text-white flex justify-between p-4 bg-zinc-800 w-full">
        <label className="text-xl">Uber</label>
        <div className="flex gap-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/historial">Historial</Link>
          <button
            className="bg-red-500 hover:bg-red-400 hover:cursor-pointer rounded-2xl text-white"
            onClick={() => {
              localStorage.removeItem("access_token");
              navigate("/login");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
      <main className="w-full flex justify-center mt-4">
        <Outlet />
      </main>
    </div>
  );
}
