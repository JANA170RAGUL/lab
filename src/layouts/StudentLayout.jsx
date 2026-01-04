import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";
import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <div style={{ flex: 1, display: "flex" }}>
        <StudentSidebar />

        <main
          style={{
            flex: 1,
            padding: "24px",
            backgroundColor: "#f9fafb",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;
