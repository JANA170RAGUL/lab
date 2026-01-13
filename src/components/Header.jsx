import { useLocation, useNavigate } from "react-router-dom";
import veltechLogo from "../assets/logos/veltech.png";
import aicteLogo from "../assets/logos/aicte.jpeg";
import ideaLabLogo from "../assets/logos/idealab.jpeg";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine role based on current path
  const getCurrentRole = () => {
    if (location.pathname.startsWith("/admin")) return "ADMIN";
    if (location.pathname.startsWith("/student")) return "STUDENT";
    if (location.pathname.startsWith("/reviewer")) return "REVIEWER";
    return "GUEST";
  };

  const role = getCurrentRole();

  const handleLogout = () => {
    // Clear any stored authentication data (if any)
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login page
    navigate("/");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        height: "56px",
        backgroundColor: "#800000",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        fontSize: "14px",
      }}
    >
      {/* Left: Logos + Institute + Lab */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontWeight: "600",
          letterSpacing: "0.3px",
        }}
      >
        {/* Logos */}
        <img src={veltechLogo} alt="Vel Tech" style={{ height: "32px", borderRadius: "6px" }} />
        <img src={aicteLogo} alt="AICTE" style={{ height: "32px", borderRadius: "6px" }} />
        <img src={ideaLabLogo} alt="IDEA Lab" style={{ height: "32px", borderRadius: "6px" }} />

        {/* Text */}
        <span>
          Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College — AICTE IDEA Lab
        </span>
      </div>

      {/* Center: Academic Context */}
      <div style={{ opacity: 0.9 }}>
        Academic Year 2024–25 | Even Semester
      </div>

      {/* Right: Role Badge + Logout Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Role Badge */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: "600",
            color: "#ffffff",
          }}
        >
          {role}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#ffffff",
            padding: "6px 16px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255,255,255,0.3)";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;