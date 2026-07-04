import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <nav className="text-white">Uber clone</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
