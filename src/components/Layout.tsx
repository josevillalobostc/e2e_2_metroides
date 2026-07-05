import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center">
      <nav className="text-white flex justify-between p-4 bg-zinc-800 w-full">
        <label className="text-xl">Uber clone</label>
        <div className="flex gap-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/historial">Historial</Link>
        </div>
      </nav>
      <main className="w-full flex justify-center mt-4">
        <Outlet />
      </main>
    </div>
  );
}
