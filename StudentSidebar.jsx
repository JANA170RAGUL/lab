import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./StudentSidebar.css";

function StudentSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/student/dashboard", label: "Dashboard" },
    { path: "/student/live-events", label: "Live Events" },
    { path: "/student/registrations", label: "My Registrations" },
    { path: "/student/attendance", label: "Attendance" },
    { path: "/student/feedback", label: "Feedback" },
    { path: "/student/certificates", label: "Certificates" },
    { path: "/student/help", label: "Help Desk" },
  ];

  return (
    <aside className={`student-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="student-sidebar-header">
        <h3 className="student-sidebar-title">Student Menu</h3>
        <button
          className="student-collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="student-sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `student-sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="student-sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default StudentSidebar;
