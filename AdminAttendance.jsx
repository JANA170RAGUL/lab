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
    status: "Not Started",
    dates: "10–12 Jan",
    duration: "3 Days",
    approved: 60,
    submissions: 0,
    formLink: "https://forms.gle/fdp-ai",
  },
  {
    id: "EVT-002",
    name: "Startup Bootcamp",
    status: "LIVE",
    dates: "15–16 Jan",
    duration: "2 Days",
    approved: 60,
    submissions: 42,
    formLink: "https://forms.gle/startup-bootcamp",
  },
  {
    id: "EVT-003",
    name: "Ideation Workshop",
    status: "Locked",
    dates: "20–21 Jan",
    duration: "2 Days",
    approved: 40,
    submissions: 40,
    formLink: "https://forms.gle/ideation-workshop",
  },
];

function AdminAttendance() {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [formLink, setFormLink] = useState("");
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [showLockModal, setShowLockModal] = useState(false);
  const [attendanceLocked, setAttendanceLocked] = useState(false);

  const selectedEvent = EVENTS.find(
    (event) => event.id === selectedEventId
  );

  const isLive = selectedEvent?.status === "LIVE";
  const isLocked = attendanceLocked || selectedEvent?.status === "Locked";

  const attendancePercent =
    selectedEvent && selectedEvent.approved > 0
      ? Math.round(
        (selectedEvent.submissions / selectedEvent.approved) * 100
      )
      : 0;

  /* ================= MOCK ATTENDANCE DATA ================= */
  const attendanceRows = [
    { roll: "22AD01", name: "Harsha M", submitted: true },
    { roll: "22AD07", name: "Ananya K", submitted: true },
    { roll: "22AD12", name: "Rahul S", submitted: false },
  ];

  const attendanceColumns = [
    "Roll No",
    "Student Name",
    "Form Submitted",
    "Attendance Status",
  ];

  const attendanceTableData = attendanceRows.map((row) => [
    row.roll,
    row.name,
    row.submitted ? "✔" : "✖",
    <Badge
      label={row.submitted ? "Present" : "Absent"}
      type={row.submitted ? "success" : "error"}
    />,
  ]);

  const handleSync = () => {
    setLastSyncedAt(new Date().toLocaleString());
    alert("Attendance responses synced (backend)");
  };

  const confirmLockAttendance = () => {
    setAttendanceLocked(true);
    setAttendanceOpen(false);
    setShowLockModal(false);
    alert("Attendance locked permanently (backend)");
  };

  return (
    <>
      {/* ================= SECTION 1: PAGE HEADER & EVENT CONTEXT ================= */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>Attendance</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
              Google Form–based attendance governance
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select
              value={selectedEventId}
              onChange={(e) => {
                const eventId = e.target.value;
                setSelectedEventId(eventId);
                const ev = EVENTS.find((e) => e.id === eventId);
                setFormLink(ev?.formLink || "");
                setAttendanceOpen(false);
                setLastSyncedAt(null);
                setAttendanceLocked(false);
              }}
              style={{
                padding: "8px 10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "13px",
                minWidth: "260px",
              }}
            >
              <option value="">Select Event</option>
              {EVENTS.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>

            {selectedEvent && (
              <Badge
                label={isLocked ? "Locked" : selectedEvent.status}
                type={
                  isLocked
                    ? "error"
                    : selectedEvent.status === "LIVE"
                      ? "success"
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", fontSize: "13px" }}>
            <div><strong>Event:</strong><div>{selectedEvent.name}</div></div>
            <div><strong>Dates:</strong><div>{selectedEvent.dates} ({selectedEvent.duration})</div></div>
            <div><strong>Approved Students:</strong><div>{selectedEvent.approved}</div></div>
            <div><strong>Form Submissions:</strong><div>{selectedEvent.submissions}</div></div>
          </div>
        </Card>
      )}

      {/* ================= SECTION 3: ATTENDANCE CONTROL PANEL ================= */}
      {selectedEvent && (
        <Card>
          <h3 style={sectionHeading}>Attendance Controls</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button disabled={isLive || isLocked} onClick={() => alert("Mark Event as LIVE (backend)")}>
              Mark Event as LIVE
            </Button>

            <Button disabled={!isLive || attendanceOpen || isLocked} onClick={() => setAttendanceOpen(true)}>
              Open Attendance
            </Button>

            <Button
              variant="secondary"
              disabled={!attendanceOpen || isLocked}
              onClick={() => setShowLockModal(true)}
            >
              Lock Attendance
            </Button>
          </div>
        </Card>
      )}

      {/* ================= SECTION 4: GOOGLE FORM LINK ================= */}
      {selectedEvent && (
        <Card>
          <h3 style={sectionHeading}>Attendance Form</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", width: "100%" }}>
            <input
              type="url"
              placeholder="https://forms.gle/xxxxxxxxxx"
              value={formLink}
              disabled={!attendanceOpen || isLocked}
              onChange={(e) => setFormLink(e.target.value)}
              style={{
                flex: 1,
                padding: "8px 10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "13px",
                boxSizing: "border-box",
                outline: "none",
                color: "#374151",
              }}
            />
            <button
              onClick={() => {
                if (formLink) {
                  navigator.clipboard.writeText(formLink);
                  alert("Link copied to clipboard!");
                }
              }}
              disabled={!formLink}
              title="Copy Link"
              style={{
                background: "none",
                border: "none",
                cursor: formLink ? "pointer" : "not-allowed",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: formLink ? "#4b5563" : "#9ca3af",
                transition: "color 0.2s",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          <Button disabled={!attendanceOpen || !formLink || isLocked}>
            Save Link
          </Button>
        </Card>
      )}

      {/* ================= SECTION 5: METRICS ================= */}
      {selectedEvent && (
        <Card>
          <h3 style={sectionHeading}>Live Attendance Metrics</h3>
          <div style={{ display: "flex", gap: "24px" }}>
            <div>Approved: <strong>{selectedEvent.approved}</strong></div>
            <div>Submitted: <strong>{selectedEvent.submissions}</strong></div>
            <div>Attendance: <strong>{attendancePercent}%</strong></div>
          </div>
        </Card>
      )}

      {/* ================= SECTION 6: TABLE ================= */}
      {selectedEvent && (
        <Card>
          <h3 style={sectionHeading}>Attendance Status</h3>
          <Table columns={attendanceColumns} data={attendanceTableData} />
        </Card>
      )}

      {/* ================= SECTION 7: SYNC PANEL ================= */}
      {selectedEvent && (
        <Card>
          <h3 style={sectionHeading}>Attendance Sync</h3>
          <div style={{ fontSize: "13px", marginBottom: "8px" }}>
            Last Synced: {lastSyncedAt || "Not yet synced"}
          </div>
          <Button disabled={isLocked} onClick={handleSync}>
            Sync Responses
          </Button>
        </Card>
      )}

      {/* ================= SECTION 8: LOCK CONFIRMATION MODAL ================= */}
      {showLockModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "420px" }}>
            <h3>Lock Attendance?</h3>
            <p style={{ fontSize: "13px", marginTop: "8px" }}>
              No further submissions will be accepted. Attendance will become read-only and irreversible.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
              <Button variant="secondary" onClick={() => setShowLockModal(false)}>
                Cancel
              </Button>
              <Button onClick={confirmLockAttendance}>
                Confirm Lock
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const sectionHeading = {
  fontSize: "16px",
  fontWeight: "700",
  marginTop: "-2px",
  marginBottom: "20px",
  color: "#111827",
};

export default AdminAttendance;