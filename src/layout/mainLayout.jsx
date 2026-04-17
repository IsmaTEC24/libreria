import { Outlet } from "react-router-dom";
import Navbar from "../components/navBar.jsx";
import Sidebar from "../components/sidebar";

export default function MainLayout() {
  return (
    <div className="appContainer">

      <Sidebar />

      <div className="mainContent">

        <Navbar />

        <main className="pageContent">
          <Outlet />
        </main>

      </div>

    </div>
  );
}