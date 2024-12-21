import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function AppLayout() {
  return (
    <div>
      <NavBar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
