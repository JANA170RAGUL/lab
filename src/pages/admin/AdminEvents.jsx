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

/* ================= SHARED FILTER STYLE ================= */
const filterStyle = {
  padding: "8px 10px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "13px",
};

/* ================= ACTIONS BY STATUS ================= */
const ACTIONS_BY_STAGE = {
  Draft: ["Edit Event", "Upload Approval Confirmation"],
  "Registration Open": ["Close Registration", "View Registrations"],
  LIVE: ["Monitor Event"],
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

  /* ================= EVENTS (NUMERIC EVENT NUMBERS) ================= */
  const events = [
    {
      id: 1,
      number: 1,
      name: "FDP on Artificial Intelligence",
      type: "FDP",
      startDate: "2024-06-10",
      endDate: "2024-06-12",
      days: 3,
      registrations: "45 / 40",
      certificates: "Generated",
      status: "LIVE",
    },
    {
      id: 2,
      number: 2,
      name: "Startup Bootcamp",
      type: "Bootcamp",
      startDate: "2024-06-15",
      endDate: "2024-06-16",
      days: 2,
      registrations: "60 / 55",
      certificates: "Generated",
      status: "Completed",
    },
    {
      id: 3,
      number: 3,
      name: "Ideation Workshop",
      type: "Ideation Workshop",
      startDate: "2024-06-22",
      endDate: "2024-06-23",
      days: 2,
      registrations: "12 / 5",
      certificates: "Pending",
      status: "Draft",
    },
  ];

  /* ================= AUTO EVENT NUMBER ================= */
  const getNextEventNumber = () => {
    if (events.length === 0) return 1;
    return Math.max(...events.map((e) => Number(e.number))) + 1;
  };

  /* ================= TABLE STRUCTURE (FINAL) ================= */
  const columns = [
    "Event No",
    "Event Name",
    "Event Type",
    "Start Date",
    "End Date",
    "Days",
    "Registrations",
    "Certificates",
    "Status",
    "Actions",
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
    event.startDate,
    event.endDate,
    event.days,
    event.registrations,
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
      {/* ================= PAGE HEADER ================= */}
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
          <Button onClick={() => setShowHostModal(true)}>➕ Host Event</Button>
        </div>
      </Card>

      {/* ================= EVENT TYPES ================= */}
      <Card title="AICTE-Approved Event Types">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
            gap: "8px",
          }}
        >
          {AICTE_EVENT_TYPES.map((type) => (
            <div
              key={type}
              style={{
                padding: "8px",
                background: "#f3f4f6",
                borderRadius: "6px",
              }}
            >
              {type}
            </div>
          ))}
        </div>
      </Card>

      {/* ================= FILTERS ================= */}
      <Card title="Filters & Search">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
            gap: "12px",
          }}
        >
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

      {/* ================= EVENTS TABLE ================= */}
      <Card title="All Events (Governed View)">
        <Table columns={columns} data={tableData} />
      </Card>

      {/* ================= HOST EVENT MODAL ================= */}
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
          <div
            style={{
              background: "#fff",
              padding: "24px",
              width: "520px",
              borderRadius: "8px",
            }}
          >
            <h2>Host New Event</h2>

            {/* Auto Event Number */}
            <div
              style={{
                marginTop: "8px",
                fontSize: "13px",
                background: "#f9fafb",
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
              }}
            >
              Event Number (Auto-generated):{" "}
              <strong>{getNextEventNumber()}</strong>
            </div>

            <select
              style={{ ...filterStyle, width: "100%", marginTop: "12px" }}
            >
              <option>Event Type *</option>
              {AICTE_EVENT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <input
              style={{ ...filterStyle, marginTop: "8px" }}
              placeholder="Event Name *"
            />

            <textarea
              style={{ ...filterStyle, marginTop: "8px" }}
              placeholder="Description"
            />

            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <input type="date" style={filterStyle} />
              <input type="date" style={filterStyle} />
            </div>

            {/* Approval Document */}
            <div
              style={{
                marginTop: "12px",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Attach the Management Approval Document{" "}
              <span style={{ color: "#dc2626" }}>*</span>
            </div>

            <input
              type="file"
              style={{ marginTop: "6px" }}
              accept=".pdf,.jpg,.png"
            />

            <div
              style={{
                marginTop: "6px",
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              This document is mandatory before registrations can be opened.
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              <Button
                variant="secondary"
                onClick={() => setShowHostModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  alert(
                    `Saved as Draft\nEvent Number: ${getNextEventNumber()}`
                  );
                  setShowHostModal(false);
                }}
              >
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