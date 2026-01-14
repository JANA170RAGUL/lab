import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import authService from "../auth/authService";

function RoleSelection() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    authService.setRole(role);
    navigate(`/${role}`);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AICTE IDEA Lab</h1>
      <p>Select your role to continue:</p>

      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => handleSelect("admin")}>
          Continue as Admin
        </Button>
      </div>

      <div style={{ marginTop: "12px" }}>
        <Button variant="secondary" onClick={() => handleSelect("student")}>
          Continue as Student
        </Button>
      </div>
    </div>
  );
}

export default RoleSelection;
