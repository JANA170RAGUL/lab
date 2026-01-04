import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <div style={{ flex: 1, display: "flex" }}>
        <Sidebar />

        <main
  style={{
    flex: 1,
    padding: "32px",
    backgroundColor: "#f9fafb",
    overflowY: "auto",
    width: "100%",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "1400px",   // 👈 controls max readable width
      margin: "0 auto",     // 👈 centers nicely on large screens
    }}
  >
    <Outlet />
  </div>
</main>
      </div>
    </div>
  );
}

export default AdminLayout;
