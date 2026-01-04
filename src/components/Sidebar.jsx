import { NavLink } from "react-router-dom";

function Sidebar() {
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
        Admin Menu
      </p>

      <nav>
        <NavLink to="/admin/dashboard" style={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/events" style={linkStyle}>
          Events
        </NavLink>
        <NavLink to="/admin/registrations" style={linkStyle}>
          Registrations
        </NavLink>
        <NavLink to="/admin/attendance" style={linkStyle}>
          Attendance
        </NavLink>
        <NavLink to="/admin/feedback" style={linkStyle}>
          Feedback
        </NavLink>
        <NavLink to="/admin/certificates" style={linkStyle}>
          Certificates
        </NavLink>
        <NavLink to="/admin/evidence" style={linkStyle}>
          Evidence
        </NavLink>
        <NavLink to="/admin/outcomes" style={linkStyle}>
          Outcomes
        </NavLink>
        <NavLink to="/admin/reports" style={linkStyle}>
          Reports
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
