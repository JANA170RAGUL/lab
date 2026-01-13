import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

  /* ================= SCROLL LOCK EFFECT ================= */
  useEffect(() => {
    if (showHostModal) {
      // Lock body scroll when modal opens
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      // Unlock body scroll when modal closes
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [showHostModal]);

  /* ================= ESCAPE KEY TO CLOSE ================= */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showHostModal) {
        setShowHostModal(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showHostModal]);

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
      style={{ padding: "8px 10px", fontSize: "12px", borderRadius: "6px", border: "1px solid #d1d5db", width: "140px" }}
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
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "8px",
          }}
        >
          {AICTE_EVENT_TYPES.map((type) => (
            <div
              key={type}
              style={{
                width: "100%",
                height: "48px",
                padding: "8px 10px",
                background: "#f9fafb",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "1.3",
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                color: "#374151",
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

      {/* ================= HOST EVENT MODAL (PROPER MODAL WITH BACKDROP) ================= */}
      {showHostModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "40px 16px",
            zIndex: 9999,
            overflowY: "auto",
          }}
          onClick={() => setShowHostModal(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: "28px 32px",
              width: "95%",
              maxWidth: "820px",
              maxHeight: "85vh",
              overflowY: "auto",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.15)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close X Button */}
            <button
              onClick={() => setShowHostModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "transparent",
                border: "none",
                fontSize: "24px",
                color: "#6b7280",
                cursor: "pointer",
                padding: "4px 8px",
                lineHeight: "1",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#111827")}
              onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Modal Header */}
            <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#111827", paddingRight: "40px" }}>
              Host New Event
            </h2>

            {/* Form Container */}
            <div style={{ marginTop: "20px" }}>
              {/* Row 1: Event Number (Full Width) */}
              <div
                style={{
                  background: "#f9fafb",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  fontSize: "13px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  color: "#374151",
                  lineHeight: "1.3",
                }}
              >
                Event Number (Auto-generated):{" "}
                <strong style={{ marginLeft: "6px", color: "#111827", fontSize: "14px" }}>
                  {getNextEventNumber()}
                </strong>
              </div>

              {/* Row 2: Category Dropdown (Full Width) */}
              <div style={{ marginTop: "14px" }}>
                <select
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "10px 12px",
                    border: "1px solid #d0d7de",
                    borderRadius: "12px",
                    fontSize: "14px",
                    color: "#374151",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    outline: "none",
                    lineHeight: "1.3",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#2563eb";
                    e.target.style.boxShadow = "0 0 0 2px rgba(37, 99, 235, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d0d7de";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="" style={{ color: "#9ca3af" }}>Select Event Type *</option>
                  {AICTE_EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 3: Event Name (Left) + Description (Right) */}
              <div
                style={{
                  marginTop: "14px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                {/* Event Name Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Event Name *"
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "10px 6px",
                      border: "1px solid #d0d7de",
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: "#374151",
                      backgroundColor: "#fff",
                      outline: "none",
                      lineHeight: "1.3",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#2563eb";
                      e.target.style.boxShadow = "0 0 0 2px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d0d7de";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <style>{`
                    input::placeholder {
                      font-size: 13px;
                      color: #9ca3af;
                    }
                  `}</style>
                </div>

                {/* Description Textarea */}
                <div>
                  <textarea
                    placeholder="Description"
                    rows="3"
                    style={{
                      width: "100%",
                      height: "80px",
                      padding: "4px 12px",
                      border: "1px solid #d0d7de",
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: "#374151",
                      backgroundColor: "#fff",
                      outline: "none",
                      resize: "none",
                      fontFamily: "inherit",
                      lineHeight: "1.4",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#2563eb";
                      e.target.style.boxShadow = "0 0 0 2px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d0d7de";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <style>{`
                    textarea::placeholder {
                      font-size: 13px;
                      color: #9ca3af;
                    }
                  `}</style>
                </div>
              </div>

              {/* Row 4: Start Date (Left) + End Date (Right) */}
              <div
                style={{
                  marginTop: "14px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                {/* Start Date */}
                <div>
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "10px 6px",
                      border: "1px solid #d0d7de",
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: "#374151",
                      backgroundColor: "#fff",
                      outline: "none",
                      lineHeight: "1.3",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#2563eb";
                      e.target.style.boxShadow = "0 0 0 2px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d0d7de";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <style>{`
                    input[type="date"]::-webkit-calendar-picker-indicator {
                      cursor: pointer;
                    }
                    input[type="date"]::placeholder {
                      font-size: 13px;
                      color: #9ca3af;
                    }
                  `}</style>
                </div>

                {/* End Date */}
                <div>
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "10px 6px",
                      border: "1px solid #d0d7de",
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: "#374151",
                      backgroundColor: "#fff",
                      outline: "none",
                      lineHeight: "1.3",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#2563eb";
                      e.target.style.boxShadow = "0 0 0 2px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d0d7de";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Row 5: Approval Document Upload (Full Width) */}
              <div style={{ marginTop: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Attach the Management Approval Document{" "}
                  <span style={{ color: "#dc2626" }}>*</span>
                </label>

                {/* Custom File Upload Button */}
                <div style={{ position: "relative" }}>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    style={{
                      position: "absolute",
                      opacity: 0,
                      width: "100%",
                      height: "40px",
                      cursor: "pointer",
                    }}
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "40px",
                      padding: "0.5px 0.5px",
                      border: "1px solid #d0d7de",
                      borderRadius: "12px",
                      fontSize: "13px",
                      color: "#6b7280",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                      lineHeight: "1.3",
                      transition: "border-color 0.2s ease, background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#f9fafb";
                      e.target.style.borderColor = "#9ca3af";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#fff";
                      e.target.style.borderColor = "#d0d7de";
                    }}
                  >
                    📎 Choose file or drag here
                  </label>
                </div>

                {/* Row 6: Helper Text */}
                <div
                  style={{
                    marginTop: "6px",
                    fontSize: "12px",
                    color: "#6b7280",
                    lineHeight: "1.4",
                  }}
                >
                  This document is mandatory before registrations can be opened.
                </div>
              </div>

              {/* Row 7: Buttons (Bottom Right) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "24px",
                  paddingTop: "16px",
                  borderTop: "1px solid #e5e7eb",
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
        </div>
      )}
    </>
  );
}

export default AdminEvents;