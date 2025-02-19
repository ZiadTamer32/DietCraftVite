import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Nav from "./Nav";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <NavBar />
      <main className="p-5 m-auto max-w-7xl">
        <Nav />
        <div className="p-6 bg-white shadow-xl rounded-2xl md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
