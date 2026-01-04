import veltechLogo from "../assets/logos/veltech.png";
import aicteLogo from "../assets/logos/aicte.jpeg";
import ideaLabLogo from "../assets/logos/idealab.jpeg";

function Header() {
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
        <img src={veltechLogo} alt="Vel Tech" style={{ height: "32px" }} />
        <img src={aicteLogo} alt="AICTE" style={{ height: "32px" }} />
        <img src={ideaLabLogo} alt="IDEA Lab" style={{ height: "32px" }} />

        {/* Text */}
        <span>
          Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and
          Technology — AICTE IDEA Lab
        </span>
      </div>

      {/* Center: Academic Context */}
      <div style={{ opacity: 0.9 }}>
        Academic Year 2024–25 | Even Semester
      </div>

      {/* Right: Role Badge (unchanged) */}
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
        ADMIN
      </div>
    </header>
  );
}

export default Header;