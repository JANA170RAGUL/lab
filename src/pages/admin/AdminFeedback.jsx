import { useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";

/* ================= MOCK EVENTS (UI ONLY) ================= */
const EVENTS = [
  {
    id: "EVT-001",
    name: "FDP on Artificial Intelligence",
    dates: "10–12 Jan (3 Days)",
    attendanceMarked: 42,
    feedbackSubmitted: 35,
    feedbackStatus: "Not Open",
    feedbackForm: "",
  },
  {
    id: "EVT-002",
    name: "Startup Bootcamp",
    dates: "15–16 Jan (2 Days)",
    attendanceMarked: 60,
    feedbackSubmitted: 60,
    feedbackStatus: "Open",
    feedbackForm: "https://forms.gle/sample-feedback-form",
  },
  {
    id: "EVT-003",
    name: "Ideation Workshop",
    dates: "20–21 Jan (2 Days)",
    attendanceMarked: 30,
    feedbackSubmitted: 30,
    feedbackStatus: "Locked",
    feedbackForm: "https://forms.gle/locked-form",
  },
];

/* ================= MOCK FEEDBACK DATA ================= */
const FEEDBACK_ROWS = [
  {
    roll: "22AD01",
    name: "Harsha M",
    submitted: true,
    time: "12 Jan 02:15 PM",
  },
  {
    roll: "22AD07",
    name: "Ananya K",
    submitted: true,
    time: "12 Jan 02:18 PM",
  },
  {
    roll: "22AD12",
    name: "Rahul S",
    submitted: false,
    time: "—",
  },
];

function AdminFeedback() {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [formLink, setFormLink] = useState("");
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  const selectedEvent = EVENTS.find(
    (event) => event.id === selectedEventId
  );

  const completionPercent =
    selectedEvent && selectedEvent.attendanceMarked > 0
      ? Math.round(
          (selectedEvent.feedbackSubmitted /
            selectedEvent.attendanceMarked) *
            100
        )
      : 0;

  const tableColumns = [
    "Roll No",
    "Student Name",
    "Feedback Submitted",
    "Submission Time",
  ];

  const tableData = FEEDBACK_ROWS.map((row) => [
    row.roll,
    row.name,
    row.submitted ? (
      <Badge label="Submitted" type="success" />
    ) : (
      <Badge label="Not Submitted" type="warning" />
    ),
    row.time,
  ]);

  return (
    <>
      {/* ================= SECTION 1: PAGE HEADER & EVENT CONTEXT ================= */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>Feedback</div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              Governed feedback collection & finalization
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select
              value={selectedEventId}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
                const ev = EVENTS.find(ev => ev.id === e.target.value);
                setFormLink(ev?.feedbackForm || "");
              }}
              style={{
                padding: "8px 10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                minWidth: "260px",
              }}
            >
              <option value="">Select Event</option>
              {EVENTS.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>

            {selectedEvent && (
              <Badge
                label={selectedEvent.feedbackStatus}
                type={
                  selectedEvent.feedbackStatus === "Open"
                    ? "success"
                    : selectedEvent.feedbackStatus === "Locked"
                    ? "error"
                    : "warning"
                }
              />
            )}
          </div>
        </div>
      </Card>

      {/* ================= SECTION 2: EVENT SUMMARY STRIP ================= */}
      {selectedEvent && (
        <Card>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            <div><strong>Event</strong><div>{selectedEvent.name}</div></div>
            <div><strong>Dates</strong><div>{selectedEvent.dates}</div></div>
            <div><strong>Attendance Marked</strong><div>{selectedEvent.attendanceMarked}</div></div>
            <div><strong>Feedback Submitted</strong><div>{selectedEvent.feedbackSubmitted}</div></div>
          </div>
        </Card>
      )}

      {/* ================= SECTION 3: FEEDBACK CONTROL PANEL ================= */}
      {selectedEvent && (
        <Card title="Feedback Controls">
          <div style={{ display: "flex", gap: "16px" }}>
            <Button disabled={selectedEvent.feedbackStatus !== "Not Open"}>
              Open Feedback
            </Button>
            <Button
              variant="danger"
              disabled={selectedEvent.feedbackStatus !== "Open"}
            >
              Lock Feedback
            </Button>
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
            Once locked, feedback becomes read-only and irreversible.
          </div>
        </Card>
      )}

      {/* ================= SECTION 4: FEEDBACK FORM CONFIGURATION ================= */}
      {selectedEvent && (
        <Card title="Feedback Form">
          <input
            type="text"
            value={formLink}
            onChange={(e) => setFormLink(e.target.value)}
            disabled={selectedEvent.feedbackStatus === "Locked"}
            placeholder="https://forms.gle/xxxxxxxxxx"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              marginBottom: "10px",
            }}
          />
          <Button
            disabled={selectedEvent.feedbackStatus === "Locked" || !formLink}
          >
            Save Link
          </Button>
        </Card>
      )}

      {/* ================= SECTION 5: FEEDBACK METRICS PANEL ================= */}
      {selectedEvent && (
        <Card title="Feedback Metrics">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            <div>
              <strong>Attendance Marked</strong>
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                {selectedEvent.attendanceMarked}
              </div>
            </div>
            <div>
              <strong>Feedback Submitted</strong>
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                {selectedEvent.feedbackSubmitted}
              </div>
            </div>
            <div>
              <strong>Completion Rate</strong>
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                {completionPercent}%
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ================= SECTION 6: FEEDBACK SUMMARY TABLE ================= */}
      {selectedEvent && (
        <Card title="Feedback Submission Summary">
          <Table columns={tableColumns} data={tableData} />
        </Card>
      )}

      {/* ================= SECTION 7: FEEDBACK RESPONSE SYNC PANEL ================= */}
      {selectedEvent && (
        <Card title="Feedback Sync">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ fontSize: "13px" }}>
              <strong>Last Synced:</strong>{" "}
              {lastSyncedAt || "Not synced yet"}
            </div>

            <Button
              disabled={selectedEvent.feedbackStatus === "Not Open"}
              onClick={() => {
                const now = new Date().toLocaleString();
                setLastSyncedAt(now);
                alert("Feedback responses synced (UI placeholder)");
              }}
            >
              Sync Responses
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}

export default AdminFeedback;