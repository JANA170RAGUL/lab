import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

/*
  STUDENT ATTENDANCE — PHASE 2
  Google Form Access (UI only)
*/

function Attendance() {
  /* ================= MOCK DATA (backend later) ================= */
  const registrationStatus = "Approved"; // Approved | Pending | Rejected
  const eventStatus = "LIVE"; // LIVE | Completed | Archived
  const attendanceStatus = "Open";
  // "Not Open" | "Open" | "Submitted" | "Closed"

  const submissionTime = "12 Jan 2026, 10:42 AM";

  const attendanceFormLink =
    "https://forms.gle/xxxxxxxxxx"; // admin-provided

  /* ================= VISIBILITY RULE ================= */
  const isEligibleToView =
    registrationStatus === "Approved" && eventStatus === "LIVE";

  if (!isEligibleToView) {
    return (
      <Card>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>
          Attendance is not available for this event.
        </div>
      </Card>
    );
  }

  return (
    <>
      {/* ================= SECTION 1: EVENT CONTEXT ================= */}
      <Card>
        <div style={{ fontSize: "18px", fontWeight: "700" }}>
          FDP on Artificial Intelligence
        </div>

        <div
          style={{
            marginTop: "6px",
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          10–12 January (3 Days)
        </div>

        <div style={{ marginTop: "8px" }}>
          <Badge label="LIVE" type="success" />
        </div>
      </Card>

      {/* ================= SECTION 2: ATTENDANCE STATUS ================= */}
      <Card title="Attendance Status">
        {attendanceStatus === "Not Open" && (
          <StatusMessage
            text="Attendance is not yet open. Please wait for the coordinator to open attendance."
          />
        )}

        {attendanceStatus === "Open" && (
          <>
            <StatusMessage
              text="Attendance is OPEN. Please submit the attendance form using your registered email and roll number."
            />

            {/* === PHASE 2 ADDITION: GOOGLE FORM ACCESS === */}
            <div style={{ marginTop: "14px" }}>
              <a
                href={attendanceFormLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 16px",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Open Attendance Form
              </a>
            </div>
          </>
        )}

        {attendanceStatus === "Submitted" && (
          <div>
            <div style={{ color: "#059669", fontWeight: "600" }}>
              ✔ Attendance Submitted Successfully
            </div>
            <div
              style={{
                marginTop: "6px",
                fontSize: "13px",
                color: "#6b7280",
              }}
            >
              Submitted on: {submissionTime}
            </div>
          </div>
        )}

        {attendanceStatus === "Closed" && (
          <StatusMessage
            text="Attendance is CLOSED. If you have not submitted the form, attendance cannot be marked."
          />
        )}
      </Card>

      {/* ================= SECTION 3: INSTRUCTIONS ================= */}
      <Card title="Instructions">
        <ul style={{ paddingLeft: "18px", lineHeight: "1.8", fontSize: "13px" }}>
          <li>Attendance is mandatory for certificate eligibility</li>
          <li>Submit the form only once</li>
          <li>Use your registered email and roll number</li>
          <li>Late submissions are not accepted</li>
        </ul>
      </Card>
    </>
  );
}

/* ================= HELPER ================= */
function StatusMessage({ text }) {
  return (
    <div style={{ fontSize: "14px", color: "#374151" }}>
      {text}
    </div>
  );
}

export default Attendance;