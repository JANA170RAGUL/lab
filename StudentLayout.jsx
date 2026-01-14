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
            background: "linear-gradient(135deg, #780206 0%, #061161 100%)",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            overflowY: "auto",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;
