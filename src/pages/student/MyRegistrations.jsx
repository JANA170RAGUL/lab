import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

/* ================= FIXED EVENT TYPES ================= */
const EVENT_TYPES = [
  "FDP",
  "Bootcamp",
  "Skilling Programme",
  "Ideation Workshop",
  "Awareness Workshops",
  "Professional Skilling",
  "School Teacher Awareness",
  "Open Day for Students",
  "Annual Conference",
  "Symposium of all IDEA Labs",
  "Others",
];

/* ================= MOCK REGISTRATIONS (UI ONLY) ================= */
const REGISTRATIONS = [
  {
    id: 1,
    name: "FDP on Artificial Intelligence",
    type: "FDP",
    dates: "10–12 January",
    duration: "3 Days",
    venue: "IDEA Lab",
    registrationStatus: "Approved",
    eventStatus: "LIVE",
    attendance: "Submitted",
    feedback: "Pending",
    certificate: "Not Available",
  },
  {
    id: 2,
    name: "Bootcamp on Cloud Computing",
    type: "Bootcamp",
    dates: "05–07 December",
    duration: "3 Days",
    venue: "Online",
    registrationStatus: "Completed",
    eventStatus: "Completed",
    attendance: "Submitted",
    feedback: "Submitted",
    certificate: "Available",
  },
  {
    id: 3,
    name: "Workshop on IoT",
    type: "Ideation Workshop",
    dates: "18 November",
    duration: "1 Day",
    venue: "IDEA Lab",
    registrationStatus: "Pending Approval",
    eventStatus: "LIVE",
    attendance: "—",
    feedback: "—",
    certificate: "—",
  },
  {
    id: 4,
    name: "Startup Awareness Session",
    type: "Awareness Workshops",
    dates: "02 October",
    duration: "1 Day",
    venue: "Auditorium",
    registrationStatus: "Rejected",
    eventStatus: "Completed",
    attendance: "—",
    feedback: "—",
    certificate: "—",
  },
];

/* ================= SHARED STYLES ================= */
const filterStyle = {
  padding: "8px 10px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "13px",
};

function MyRegistrations() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* ================= STATUS BADGES ================= */
  const registrationBadge = (status) => {
    if (status === "Pending Approval")
      return <Badge label="Pending Approval" type="warning" />;
    if (status === "Approved")
      return <Badge label="Approved" type="success" />;
    if (status === "Rejected")
      return <Badge label="Rejected" type="danger" />;
    if (status === "Completed")
      return <Badge label="Completed" type="info" />;
    return <Badge label={status} />;
  };

  /* ================= ACTION LOGIC (STRICT) ================= */
  const renderActions = (event) => {
    if (event.registrationStatus === "Pending Approval") {
      return <div style={mutedText}>Awaiting admin approval</div>;
    }

    if (event.registrationStatus === "Rejected") {
      return <div style={mutedText}>Participation not allowed</div>;
    }

    if (event.registrationStatus === "Approved" && event.eventStatus === "LIVE") {
      return (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button variant="secondary">Go to Attendance</Button>
          <Button variant="secondary">Go to Feedback</Button>
        </div>
      );
    }

    if (event.registrationStatus === "Completed") {
      return event.certificate === "Available" ? (
        <Button>View Certificate</Button>
      ) : (
        <div style={mutedText}>Certificate not eligible</div>
      );
    }

    return null;
  };

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <Card>
        <div>
          <div style={{ fontSize: "20px", fontWeight: "700" }}>
            My Registrations
          </div>
          <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
            Track your event approvals, participation, and certificates
          </div>
        </div>
      </Card>

      {/* ================= FILTERS ================= */}
      <Card title="Filter Registrations">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <select style={filterStyle}>
            <option>Registration Status</option>
            <option>Pending Approval</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Completed</option>
          </select>

          <select style={filterStyle}>
            <option>Event Type</option>
            {EVENT_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <input type="date" style={filterStyle} />
        </div>

        <input
          type="text"
          placeholder="Search by event name"
          style={{ ...filterStyle, width: "100%" }}
        />
      </Card>

      {/* ================= REGISTRATION CARDS ================= */}
      {REGISTRATIONS.length === 0 ? (
        <Card>
          <div style={{ textAlign: "center", padding: "32px" }}>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              You have not registered for any events
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px" }}>
              Visit Live Events to participate.
            </div>
          </div>
        </Card>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {REGISTRATIONS.map((event) => (
            <Card key={event.id}>
              <div style={{ fontWeight: "700", marginBottom: "6px" }}>
                {event.name}
              </div>

              <div style={{ fontSize: "13px", lineHeight: "1.7" }}>
                <div><strong>Type:</strong> {event.type}</div>
                <div><strong>Dates:</strong> {event.dates} ({event.duration})</div>
                <div><strong>Registration:</strong> {registrationBadge(event.registrationStatus)}</div>
                <div><strong>Event Status:</strong> {event.eventStatus}</div>
                <div><strong>Attendance:</strong> {event.attendance}</div>
                <div><strong>Feedback:</strong> {event.feedback}</div>
                <div><strong>Certificate:</strong> {event.certificate}</div>
              </div>

              <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                <Button variant="secondary" onClick={() => setSelectedEvent(event)}>
                  View Details
                </Button>
              </div>

              <div style={{ marginTop: "10px" }}>
                {renderActions(event)}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ================= EVENT DETAILS MODAL ================= */}
      {selectedEvent && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Event Details
            </div>

            <div style={{ marginTop: "12px", fontSize: "13px", lineHeight: "1.7" }}>
              <div><strong>Event Name:</strong> {selectedEvent.name}</div>
              <div><strong>Event Type:</strong> {selectedEvent.type}</div>
              <div><strong>Dates:</strong> {selectedEvent.dates}</div>
              <div><strong>Duration:</strong> {selectedEvent.duration}</div>
              <div><strong>Venue:</strong> {selectedEvent.venue}</div>
              <div><strong>Registration Status:</strong> {selectedEvent.registrationStatus}</div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <Button onClick={() => setSelectedEvent(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= HELPERS ================= */
const mutedText = {
  fontSize: "12px",
  color: "#6b7280",
};

/* ================= MODAL STYLES ================= */
const modalOverlay = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 50,
};

const modalBox = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "520px",
};

export default MyRegistrations;