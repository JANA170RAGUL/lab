import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { useState } from "react";

const TABS = [
  "Overview",
  "Registrations",
  "Attendance",
  "Feedback",
  "Certificates",
  "Evidence",
  "Awards & Outcomes",
  "Final Report",
];

function AdminEventDetails() {
  const { eventId } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      {/* ================= EVENT HEADER ================= */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              Event Details — EVT-{eventId}
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              Governed Event Lifecycle View
            </div>
          </div>

          <Badge label="LIVE" type="success" />
        </div>
      </Card>

      {/* ================= TABS ================= */}
      <Card>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "12px",
          }}
        >
          {TABS.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "primary" : "secondary"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </Card>

      {/* ================= TAB CONTENT ================= */}
      <Card title={activeTab}>
        {activeTab === "Overview" && (
          <ul style={{ lineHeight: "1.8", paddingLeft: "18px" }}>
            <li>Event Type: FDP</li>
            <li>Dates: 10 Jun – 12 Jun</li>
            <li>Duration: 3 days</li>
            <li>AICTE Points: 30</li>
            <li>Status: LIVE</li>
          </ul>
        )}

        {activeTab === "Registrations" && (
          <p>View participant registrations and approval status.</p>
        )}

        {activeTab === "Attendance" && (
          <p>Attendance QR and verification records.</p>
        )}

        {activeTab === "Feedback" && (
          <p>Feedback completion statistics and summaries.</p>
        )}

        {activeTab === "Certificates" && (
          <p>Certificate generation and issuance records.</p>
        )}

        {activeTab === "Evidence" && (
          <p>Uploaded approval proofs, photos, and reports.</p>
        )}

        {activeTab === "Awards & Outcomes" && (
          <p>Recorded awards, startups, and innovation outcomes.</p>
        )}

        {activeTab === "Final Report" && (
          <>
            <p>Consolidated event report for inspection.</p>
            <Button onClick={() => alert("Download Report (UI only)")}>
              Download Final Report
            </Button>
          </>
        )}
      </Card>
    </>
  );
}

export default AdminEventDetails;