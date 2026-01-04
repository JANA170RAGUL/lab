import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";

/* ================= GOVERNANCE: FIXED AICTE EVENT TYPES ================= */
const AICTE_EVENT_TYPES = [
  "FDP",
  "Skilling Programme",
  "Bootcamp",
  "Ideation Workshop",
  "Awareness Workshops for Industries",
  "Professional Skilling",
  "School Teacher Awareness",
  "Open Day for Students",
  "Annual Conference",
  "Symposium of all IDEA Labs",
  "Others (AICTE-approved only)",
];

/* ================= FILTER OPTIONS ================= */
const ACADEMIC_YEARS = ["2024–25", "2023–24", "2022–23"];
const EVENT_STATUSES = [
  "Draft",
  "Registration Open",
  "LIVE",
  "Completed",
  "Archived",
];

/* ================= SHARED FILTER STYLE ================= */
const filterStyle = {
  padding: "8px 10px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "13px",
};

/* ================= EVENT LIFECYCLE ================= */
const EVENT_LIFECYCLE = [
  "Draft",
  "Approval Confirmed",
  "Registration Open",
  "LIVE",
  "Attendance Locked",
  "Feedback Closed",
  "Certificates Generated",
  "Archived",
];

/* ================= ACTIONS BY STAGE ================= */
const ACTIONS_BY_STAGE = {
  Draft: ["Edit Event", "Upload Approval Confirmation"],
  "Registration Open": ["Close Registration", "View Registrations"],
  LIVE: ["Display Attendance QR", "Monitor Attendance"],
  "Attendance Locked": ["Open / Lock Feedback"],
  "Feedback Closed": ["Generate Certificates"],
  Completed: [
    "Upload Evidence",
    "Add Awards & Outcomes",
    "View Final Event Report",
  ],
  Archived: ["View Final Event Report"],
};

function AdminEvents() {
  const navigate = useNavigate();
  const [showHostModal, setShowHostModal] = useState(false);

  /* ================= EVENTS TABLE ================= */
  const columns = [
    "Event No",
    "Event Name",
    "Event Type",
    "Dates",
    "Days",
    "AICTE Points",
    "Registrations",
    "Attendance",
    "Feedback",
    "Certificates",
    "Status",
    "Actions",
  ];

  const events = [
    {
      id: 1,
      number: "EVT-001",
      name: "FDP on Artificial Intelligence",
      type: "FDP",
      dates: "10 Jun – 12 Jun",
      days: 3,
      points: 30,
      registrations: "45 / 40",
      attendance: "LIVE",
      feedback: "82%",
      certificates: "Generated",
      status: "LIVE",
    },
    {
      id: 2,
      number: "EVT-002",
      name: "Startup Bootcamp",
      type: "Bootcamp",
      dates: "15 Jun – 16 Jun",
      days: 2,
      points: 20,
      registrations: "60 / 55",
      attendance: "Locked",
      feedback: "100%",
      certificates: "Generated",
      status: "Completed",
    },
    {
      id: 3,
      number: "EVT-003",
      name: "Ideation Workshop",
      type: "Ideation Workshop",
      dates: "22 Jun – 23 Jun",
      days: 2,
      points: 20,
      registrations: "12 / 5",
      attendance: "Not Started",
      feedback: "0%",
      certificates: "Pending",
      status: "Draft",
    },
  ];

  const tableData = events.map((event) => [
    event.number,
    <span
      key={event.id}
      style={{ color: "#2563eb", cursor: "pointer", fontWeight: "500" }}
      onClick={() => navigate(`/admin/events/${event.id}`)}
    >
      {event.name}
    </span>,
    event.type,
    event.dates,
    event.days,
    event.points,
    event.registrations,
    <Badge label={event.attendance} />,
    event.feedback,
    <Badge
      label={event.certificates}
      type={event.certificates === "Generated" ? "success" : "warning"}
    />,
    <Badge label={event.status} />,
    <select
      style={{ padding: "6px", fontSize: "12px", borderRadius: "6px" }}
      onChange={(e) => {
        if (e.target.value) {
          alert(`${e.target.value} — ${event.name}`);
          e.target.value = "";
        }
      }}
    >
      <option value="">⋮ Manage</option>
      {(ACTIONS_BY_STAGE[event.status] || []).map((action) => (
        <option key={action} value={action}>
          {action}
        </option>
      ))}
    </select>,
  ]);

  return (
    <>
      {/* ================= SECTION 1: PAGE HEADER ================= */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              AICTE IDEA Lab Events
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              Governed Event Hosting & Lifecycle Management
            </div>
          </div>

          <Button onClick={() => setShowHostModal(true)}>
            ➕ Host Event
          </Button>
        </div>
      </Card>

      {/* ================= SECTION 2 ================= */}
      <Card title="AICTE-Approved Event Types (Governance)">
        <div style={{ fontSize: "13px", marginBottom: "12px" }}>
          Events hosted under the IDEA Lab must strictly belong to one of the
          following AICTE-approved categories.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "8px" }}>
          {AICTE_EVENT_TYPES.map((type) => (
            <div key={type} style={{ padding: "8px", background: "#f3f4f6", borderRadius: "6px" }}>
              {type}
            </div>
          ))}
        </div>
      </Card>

      {/* ================= SECTION 3 ================= */}
      <Card title="Filters & Search">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: "12px" }}>
          <select style={filterStyle}><option>Academic Year</option></select>
          <select style={filterStyle}><option>Event Type</option></select>
          <select style={filterStyle}><option>Event Status</option></select>
          <input type="date" style={filterStyle} />
          <input type="date" style={filterStyle} />
        </div>
        <input
          style={{ ...filterStyle, marginTop: "12px", width: "100%" }}
          placeholder="Search by Event Name / Event Number"
        />
      </Card>

      {/* ================= SECTION 4 + 6 ================= */}
      <Card title="All Events (Governed View)">
        <Table columns={columns} data={tableData} />
      </Card>

      {/* ================= SECTION 5 ================= */}
      <Card title="Event Lifecycle (Governance Enforced)">
        Draft → Approval → Registration → LIVE → Attendance → Feedback →
        Certificate → Archived
      </Card>

      {/* ================= SECTION 7: HOST EVENT MODAL ================= */}
      {showHostModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          <div style={{ background: "#fff", padding: "24px", width: "520px", borderRadius: "8px" }}>
            <h2>Host New Event</h2>

            <select style={{ ...filterStyle, width: "100%", marginTop: "12px" }}>
              <option>Event Type *</option>
              {AICTE_EVENT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <input style={{ ...filterStyle, marginTop: "8px" }} placeholder="Event Number *" />
            <input style={{ ...filterStyle, marginTop: "8px" }} placeholder="Event Name *" />
            <textarea style={{ ...filterStyle, marginTop: "8px" }} placeholder="Description" />

            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <input type="date" style={filterStyle} />
              <input type="date" style={filterStyle} />
            </div>

            <div style={{ fontSize: "13px", marginTop: "8px" }}>
              Duration: Auto | AICTE Points: Auto
            </div>

            <input type="file" style={{ marginTop: "12px" }} />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
              <Button variant="secondary" onClick={() => setShowHostModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => alert("Saved as Draft")}>
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminEvents;