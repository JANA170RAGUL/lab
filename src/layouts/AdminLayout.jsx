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
            background: "linear-gradient(135deg, #360033 0%, #0b8793 100%)",
            backgroundAttachment: "fixed",
            overflowY: "auto",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1400px",
              margin: "0 auto",
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
