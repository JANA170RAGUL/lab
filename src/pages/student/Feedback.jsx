import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

/*
  FEEDBACK STATUS ENUM
  -------------------
  not_open   → Feedback not started
  open       → Google Form available
  submitted  → Feedback submitted
  closed     → Window closed (missed or locked)
*/

function Feedback() {
  /* ================= MOCKED EVENT CONTEXT ================= */
  const event = {
    name: "FDP on Artificial Intelligence",
    dates: "10–12 January (3 Days)",
    attendanceSubmitted: true,
    feedbackStatus: "open", // change to: not_open | open | submitted | closed
    submittedAt: "12 Jan, 02:18 PM",
    googleFormLink: "https://forms.gle/yyyyyyyyyy",
  };

  /* ================= HEADER ================= */
  return (
    <>
      {/* ================= SECTION 1: PAGE HEADER ================= */}
      <Card>
        <div style={{ fontSize: "20px", fontWeight: "700" }}>Feedback</div>
        <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
          AICTE IDEA Lab — Student Portal
        </div>
      </Card>

      {/* ================= SECTION 2: EVENT CONTEXT ================= */}
      {event.attendanceSubmitted && (
        <Card title="Event Details">
          <div style={row}><strong>Event Name:</strong> {event.name}</div>
          <div style={row}><strong>Dates:</strong> {event.dates}</div>
          <div style={row}>
            <strong>Attendance:</strong>{" "}
            <Badge label="Submitted" type="success" />
          </div>
        </Card>
      )}

      {/* ================= SECTION 3–5: FEEDBACK STATUS STATES ================= */}
      <Card title="Feedback Status">
        {/* -------- NOT OPEN -------- */}
        {event.feedbackStatus === "not_open" && (
          <StatusBlock
            title="Feedback Not Open"
            message="Feedback is not yet open. Please wait for the coordinator to open feedback."
            tone="info"
          />
        )}

        {/* -------- OPEN -------- */}
        {event.feedbackStatus === "open" && (
          <>
            <StatusBlock
              title="Feedback Open"
              message="Feedback submission is mandatory to receive the participation certificate."
              tone="success"
            />

            <Button
              onClick={() => window.open(event.googleFormLink, "_blank")}
              style={{ marginTop: "12px" }}
            >
              Open Feedback Form
            </Button>

            {/* Certificate dependency reminder */}
            <div style={noteText}>
              Note: Certificate will be generated only after successful feedback submission.
            </div>
          </>
        )}

        {/* -------- SUBMITTED -------- */}
        {event.feedbackStatus === "submitted" && (
          <StatusBlock
            title="Feedback Submitted"
            message={`Feedback submitted successfully on ${event.submittedAt}.`}
            tone="success"
            icon="✔"
          />
        )}

        {/* -------- CLOSED / MISSED -------- */}
        {event.feedbackStatus === "closed" && (
          <StatusBlock
            title="Feedback Closed"
            message="Feedback window is closed. Certificate will not be generated for this event."
            tone="error"
          />
        )}
      </Card>

      {/* ================= SECTION 6: STATIC INSTRUCTIONS ================= */}
      <Card title="Instructions">
        <ul style={instructionList}>
          <li>Feedback submission is mandatory</li>
          <li>Submit the Google Form only once</li>
          <li>Use your registered email and roll number</li>
          <li>Feedback cannot be edited after submission</li>
        </ul>
      </Card>

      {/* ================= PHASE 6: CROSS-MODULE MESSAGE (READ-ONLY) ================= */}
      <Card>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>
          Feedback status here determines:
          <ul style={{ marginTop: "6px", paddingLeft: "18px" }}>
            <li>Certificate eligibility</li>
            <li>Dashboard pending actions</li>
            <li>My Registrations status</li>
          </ul>
          This page is read-only. No manual submission or edits are allowed.
        </div>
      </Card>
    </>
  );
}

/* ================= HELPER COMPONENT ================= */
function StatusBlock({ title, message, tone, icon }) {
  const colorMap = {
    success: "#065f46",
    error: "#7f1d1d",
    info: "#1e40af",
  };

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "8px",
        backgroundColor: "#f9fafb",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          fontSize: "15px",
          fontWeight: "600",
          color: colorMap[tone],
        }}
      >
        {icon && <span style={{ marginRight: "6px" }}>{icon}</span>}
        {title}
      </div>
      <div style={{ marginTop: "6px", fontSize: "13px", color: "#374151" }}>
        {message}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const row = {
  fontSize: "13px",
  marginBottom: "6px",
};

const instructionList = {
  fontSize: "13px",
  color: "#374151",
  lineHeight: "1.7",
};

const noteText = {
  marginTop: "10px",
  fontSize: "12px",
  color: "#6b7280",
};

export default Feedback;