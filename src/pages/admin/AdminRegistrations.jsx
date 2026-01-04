import { useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";

/* ================= MOCK EVENT OPTIONS ================= */
const EVENTS = [
  { id: "EVT-001", name: "FDP on Artificial Intelligence", status: "Pre-LIVE" },
  { id: "EVT-002", name: "Startup Bootcamp", status: "LIVE" },
  { id: "EVT-003", name: "Ideation Workshop", status: "Completed" },
];

/* ================= FILTER OPTIONS ================= */
const DEPARTMENTS = ["AI & DS", "CSE", "ECE", "ME", "EEE"];
const ACADEMIC_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

/* ================= SHARED STYLE ================= */
const inputStyle = {
  padding: "8px 10px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "13px",
};

function AdminRegistrations() {
  /* ================= STATE ================= */
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewStudent, setViewStudent] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const selectedEventObj = EVENTS.find((e) => e.id === selectedEvent);
  const isEventLive = selectedEventObj?.status === "LIVE";

  /* ================= REGISTRATIONS (UI ONLY) ================= */
  const registrations = selectedEvent
    ? [
        {
          id: 1,
          roll: "22AD01",
          name: "Harsha M",
          email: "harsha@college.edu",
          dept: "AI & DS",
          year: "2nd Year",
          time: "12 Jan 10:32",
          status: "Pending",
        },
        {
          id: 2,
          roll: "22AD07",
          name: "Ananya K",
          email: "ananya@college.edu",
          dept: "AI & DS",
          year: "3rd Year",
          time: "12 Jan 10:40",
          status: "Approved",
        },
      ]
    : [];

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ================= TABLE ================= */
  const columns = [
    "☐",
    "Roll No",
    "Student Name",
    "Department",
    "Year",
    "Registered On",
    "Status",
    "Actions",
  ];

  const tableData = registrations.map((reg) => {
    const isPending = reg.status === "Pending";
    const locked = isEventLive;

    return [
      <input
        key={reg.id}
        type="checkbox"
        disabled={!isPending || locked}
        checked={selectedIds.includes(reg.id)}
        onChange={() => toggleSelect(reg.id)}
      />,
      reg.roll,
      reg.name,
      reg.dept,
      reg.year,
      reg.time,
      <Badge
        label={reg.status}
        type={
          reg.status === "Approved"
            ? "success"
            : reg.status === "Rejected"
            ? "error"
            : "warning"
        }
      />,
      isPending && !locked ? (
        <div style={{ display: "flex", gap: "6px" }}>
          <Button
            size="sm"
            onClick={() =>
              setConfirmAction({ type: "approve", target: reg })
            }
          >
            Approve
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              setConfirmAction({ type: "reject", target: reg })
            }
          >
            Reject
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setViewStudent(reg)}
          >
            View
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setViewStudent(reg)}
        >
          View
        </Button>
      ),
    ];
  });

  return (
    <>
      {/* ================= SECTION 1: HEADER ================= */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              Registrations
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              Event-wise student approval management
            </div>
          </div>

          <select
            style={{ ...inputStyle, minWidth: "260px" }}
            onChange={(e) => {
              setSelectedEvent(e.target.value);
              setSelectedIds([]);
            }}
          >
            <option value="">Select Event</option>
            {EVENTS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* ================= GOVERNANCE LOCK NOTICE ================= */}
      {isEventLive && (
        <Card>
          <div style={{ color: "#b91c1c", fontSize: "13px", fontWeight: "500" }}>
            This event is LIVE. Registrations are locked and cannot be approved
            or rejected.
          </div>
        </Card>
      )}

      {/* ================= EMPTY STATE ================= */}
      {selectedEvent && registrations.length === 0 && (
        <Card>
          <div style={{ textAlign: "center", color: "#6b7280" }}>
            No registrations found for the selected event.
          </div>
        </Card>
      )}

      {/* ================= TABLE ================= */}
      {registrations.length > 0 && (
        <Card title="Student Registrations">
          <Table columns={columns} data={tableData} />
        </Card>
      )}

      {/* ================= VIEW MODAL ================= */}
      {viewStudent && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "420px" }}>
            <h3>Student Registration Details</h3>
            <div style={{ fontSize: "13px", lineHeight: "1.8", marginTop: "12px" }}>
              <div><strong>Name:</strong> {viewStudent.name}</div>
              <div><strong>Roll:</strong> {viewStudent.roll}</div>
              <div><strong>Email:</strong> {viewStudent.email}</div>
              <div><strong>Status:</strong> {viewStudent.status}</div>
            </div>
            <div style={{ textAlign: "right", marginTop: "16px" }}>
              <Button variant="secondary" onClick={() => setViewStudent(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONFIRMATION MODAL ================= */}
      {confirmAction && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "420px" }}>
            <h3>{confirmAction.type === "approve" ? "Approve Registration" : "Reject Registration"}</h3>
            <p style={{ fontSize: "13px", marginTop: "8px" }}>
              {confirmAction.type === "approve"
                ? "Approved students will be eligible for attendance, feedback, and certificates."
                : "Rejected students will not be allowed to participate in this event."}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
              <Button variant="secondary" onClick={() => setConfirmAction(null)}>Cancel</Button>
              <Button onClick={() => setConfirmAction(null)}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminRegistrations;