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
  },
  {
    id: "EVT-002",
    name: "Startup Bootcamp",
    status: "LIVE",
    dates: "15–16 Jan",
    duration: "2 Days",
    approved: 60,
    submissions: 42,
  },
  {
    id: "EVT-003",
    name: "Ideation Workshop",
    status: "Locked",
    dates: "20–21 Jan",
    duration: "2 Days",
    approved: 40,
    submissions: 40,
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
                setSelectedEventId(e.target.value);
                setAttendanceOpen(false);
                setFormLink("");
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
        <Card title="Attendance Controls">
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
        <Card title="Attendance Form">
          <input
            type="url"
            placeholder="https://forms.gle/xxxxxxxxxx"
            value={formLink}
            disabled={!attendanceOpen || isLocked}
            onChange={(e) => setFormLink(e.target.value)}
            style={{ width: "100%", padding: "8px 10px", marginBottom: "12px" }}
          />
          <Button disabled={!attendanceOpen || !formLink || isLocked}>
            Save Link
          </Button>
        </Card>
      )}

      {/* ================= SECTION 5: METRICS ================= */}
      {selectedEvent && (
        <Card title="Live Attendance Metrics">
          <div style={{ display: "flex", gap: "24px" }}>
            <div>Approved: <strong>{selectedEvent.approved}</strong></div>
            <div>Submitted: <strong>{selectedEvent.submissions}</strong></div>
            <div>Attendance: <strong>{attendancePercent}%</strong></div>
          </div>
        </Card>
      )}

      {/* ================= SECTION 6: TABLE ================= */}
      {selectedEvent && (
        <Card title="Attendance Status">
          <Table columns={attendanceColumns} data={attendanceTableData} />
        </Card>
      )}

      {/* ================= SECTION 7: SYNC PANEL ================= */}
      {selectedEvent && (
        <Card title="Attendance Sync">
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

export default AdminAttendance;