import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative">
      <NavBar />
      <main className="p-3 md:p-5 mt-16">
        <div className="w-full mx-auto bg-white shadow-xl rounded-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
