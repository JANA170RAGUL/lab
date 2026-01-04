import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

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

/* ================= INITIAL LIVE EVENTS ================= */
const INITIAL_EVENTS = [
  {
    id: 1,
    name: "FDP on Artificial Intelligence",
    type: "FDP",
    description: "Hands-on training on AI tools and applications.",
    dates: "10–12 January",
    duration: "3 Days",
    venue: "IDEA Lab",
    registrationStatus: "not_registered",
  },
  {
    id: 2,
    name: "Bootcamp on Cloud Computing",
    type: "Bootcamp",
    description: "Intensive bootcamp covering cloud fundamentals.",
    dates: "18–19 January",
    duration: "2 Days",
    venue: "Online",
    registrationStatus: "pending",
  },
  {
    id: 3,
    name: "Workshop on IoT",
    type: "Ideation Workshop",
    description: "IoT ideation and rapid prototyping workshop.",
    dates: "25 January",
    duration: "1 Day",
    venue: "IDEA Lab",
    registrationStatus: "approved",
  },
];

/* ================= SHARED STYLES ================= */
const inputStyle = {
  padding: "8px 10px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "13px",
};

function LiveEvents() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmEvent, setConfirmEvent] = useState(null);

  /* ================= REGISTER HANDLER (UI ONLY) ================= */
  const handleConfirmRegistration = () => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === confirmEvent.id
          ? { ...event, registrationStatus: "pending" }
          : event
      )
    );
    setConfirmEvent(null);
  };

  const renderButton = (event) => {
    switch (event.registrationStatus) {
      case "pending":
        return <Button disabled>Registration Submitted</Button>;
      case "approved":
        return <Button disabled>Approved ✔</Button>;
      case "rejected":
        return <Button disabled>Rejected ✖</Button>;
      default:
        return (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setConfirmEvent(event);
            }}
          >
            Register
          </Button>
        );
    }
  };

  return (
    <>
      {/* ================= SECTION 1: PAGE HEADER ================= */}
      <Card>
        <div>
          <div style={{ fontSize: "20px", fontWeight: "700" }}>
            Live IDEA Lab Events
          </div>
          <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
            Register for currently LIVE events hosted by the institute
          </div>
        </div>
      </Card>

      {/* ================= SECTION 2: FILTERS & SEARCH ================= */}
      <Card title="Filter Live Events">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <select style={inputStyle}>
            <option value="">Event Type</option>
            {EVENT_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <input type="date" style={inputStyle} />
        </div>

        <input
          type="text"
          placeholder="Search live events by name"
          style={{
            width: "100%",
            padding: "8px 10px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "13px",
          }}
        />
      </Card>

      {/* ================= SECTION 3: LIVE EVENT CARDS ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
        }}
      >
        {events.map((event) => (
          <Card
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            style={{ cursor: "pointer" }}
          >
            <div style={{ fontWeight: "700", marginBottom: "8px" }}>
              {event.name}
            </div>

            <div style={{ fontSize: "13px", lineHeight: "1.6" }}>
              <div><strong>Type:</strong> {event.type}</div>
              <div>
                <strong>Dates:</strong> {event.dates} ({event.duration})
              </div>
              <div><strong>Venue:</strong> {event.venue}</div>
            </div>

            <div style={{ marginTop: "14px" }}>
              {renderButton(event)}
            </div>
          </Card>
        ))}
      </div>

      {/* ================= SECTION 4: EVENT DETAILS MODAL ================= */}
      {selectedEvent && (
        <Modal title="Event Details" onClose={() => setSelectedEvent(null)}>
          <Detail label="Event Name" value={selectedEvent.name} />
          <Detail label="Event Type" value={selectedEvent.type} />
          <Detail label="Description" value={selectedEvent.description} />
          <Detail label="Dates" value={selectedEvent.dates} />
          <Detail label="Duration" value={selectedEvent.duration} />
          <Detail label="Venue" value={selectedEvent.venue} />
          <Detail
            label="Registration Status"
            value={selectedEvent.registrationStatus.replace("_", " ")}
          />
        </Modal>
      )}

      {/* ================= SECTION 5: REGISTRATION CONFIRMATION MODAL ================= */}
      {confirmEvent && (
        <Modal title="Confirm Registration" onClose={() => setConfirmEvent(null)}>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: "1.6" }}>
            You are about to register for{" "}
            <strong>{confirmEvent.name}</strong>.
            <br />
            <br />
            Your registration will be sent for admin approval. Attendance,
            feedback, and certificates will be enabled only after approval.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <Button variant="secondary" onClick={() => setConfirmEvent(null)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRegistration}>
              Confirm Registration
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
function Modal({ title, children, onClose }) {
  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <div style={{ fontSize: "18px", fontWeight: "700" }}>{title}</div>
        <div style={{ marginTop: "12px" }}>{children}</div>
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div style={{ fontSize: "13px", marginBottom: "6px" }}>
      <strong>{label}:</strong> {value}
    </div>
  );
}

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

export default LiveEvents;