import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center">
      <nav className="text-white text-2xl">Uber</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
