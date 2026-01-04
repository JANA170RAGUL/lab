import { NavLink } from "react-router-dom";

function StudentSidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "8px 12px",
    borderRadius: "6px",
    color: isActive ? "#800000" : "#111827",
    fontWeight: isActive ? "600" : "500",
    textDecoration: "none",
    backgroundColor: isActive ? "#fbeaea" : "transparent",
  });

  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#fafafa",
        borderRight: "1px solid #e5e7eb",
        padding: "20px",
      }}
    >
      <p style={{ fontWeight: "600", marginBottom: "12px" }}>
        Student Menu
      </p>

      <nav>
        <NavLink to="/student/dashboard" style={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/student/live-events" style={linkStyle}>
          Live Events
        </NavLink>
        <NavLink to="/student/registrations" style={linkStyle}>
          My Registrations
        </NavLink>
        <NavLink to="/student/attendance" style={linkStyle}>
          Attendance
        </NavLink>
        <NavLink to="/student/feedback" style={linkStyle}>
          Feedback
        </NavLink>
        <NavLink to="/student/certificates" style={linkStyle}>
          Certificates
        </NavLink>
        <NavLink to="/student/help" style={linkStyle}>
          Help Desk
        </NavLink>
      </nav>
    </aside>
  );
}

export default StudentSidebar;
