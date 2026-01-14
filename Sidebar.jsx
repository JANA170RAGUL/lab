import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/events", label: "Events" },
    { path: "/admin/registrations", label: "Registrations" },
    { path: "/admin/attendance", label: "Attendance" },
    { path: "/admin/feedback", label: "Feedback" },
    { path: "/admin/certificates", label: "Certificates" },
    { path: "/admin/evidence", label: "Evidence" },
    { path: "/admin/outcomes", label: "Outcomes" },
    { path: "/admin/reports", label: "Reports" },
  ];

  return (
    <aside className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h3 className="sidebar-title">Admin Menu</h3>
        <button
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
