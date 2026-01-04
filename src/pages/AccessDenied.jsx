import Button from "../components/ui/Button";
import authService from "../auth/authService";
import { useNavigate } from "react-router-dom";

function AccessDenied() {
  const navigate = useNavigate();

  const handleReset = () => {
    authService.clearRole();
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>

      <div style={{ marginTop: "20px" }}>
        <Button onClick={handleReset}>
          Go Back to Role Selection
        </Button>
      </div>
    </div>
  );
}

export default AccessDenied;
