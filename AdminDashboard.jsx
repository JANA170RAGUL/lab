import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";

function AdminDashboard() {
  const navigate = useNavigate();
  const [certScope, setCertScope] = useState("year"); // month | year

  /* SECTION 2 — KPI DATA (Mock) */
  const totalEvents = 28;
  const pendingRegistrations = 14;
  const todaysAttendanceStatus = "LIVE"; // Not Started | LIVE | Locked
  const certificatesIssued = certScope === "month" ? 96 : 1125;

  /* Existing dashboard data */
  const eventsColumns = ["Event", "Type", "Status", "Participants"];
  const eventsData = [
    ["Ideathon 2025", "Innovation", <Badge label="Live" type="success" />, 320],
    ["AI Workshop", "Training", <Badge label="Completed" />, 240],
    [
      "Startup Bootcamp",
      "Mentorship",
      <Badge label="Upcoming" type="warning" />,
      180,
    ],
  ];

  return (
    <>
      {/* Dashboard Header */}
      <Card title="Admin Dashboard">
        <p style={{ color: "#6b7280" }}>
          Overview of system activity and compliance
        </p>
      </Card>

      {/* ================= SECTION 2: KPI CARDS (PRIORITY ROW) ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Card 1 — Total Events */}
        <Card>
          <div
            onClick={() => navigate("/admin/events")}
            style={{ cursor: "pointer" }}
          >
            <div style={{ fontSize: "28px", fontWeight: "700" }}>
              {totalEvents}
            </div>
            <div style={{ fontSize: "14px", fontWeight: "600" }}>
              Total Events
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              AICTE Approved Events (This Academic Year)
            </div>
          </div>
        </Card>

        {/* Card 2 — Pending Registrations (Urgent) */}
        <Card>
          <div
            onClick={() => navigate("/admin/registrations")}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#b91c1c",
              }}
            >
              {pendingRegistrations}
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#b91c1c",
              }}
            >
              Pending Registrations
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Requires approval
            </div>
          </div>
        </Card>

        {/* Card 3 — Today's Attendance */}
        <Card>
          <Badge
            label={todaysAttendanceStatus}
            type={todaysAttendanceStatus === "LIVE" ? "success" : "warning"}
          />
          <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "8px" }}>
            Today’s Attendance
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Showing today’s events only
          </div>
        </Card>

        {/* Card 4 — Certificates Issued */}
        <Card>
          <div style={{ fontSize: "28px", fontWeight: "700" }}>
            {certificatesIssued}
          </div>
          <div style={{ fontSize: "14px", fontWeight: "600" }}>
            Certificates Issued
          </div>

          <div style={{ marginTop: "8px" }}>
            <button
              onClick={() => setCertScope("month")}
              style={{
                marginRight: "8px",
                padding: "4px 8px",
                fontSize: "12px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor:
                  certScope === "month" ? "#800000" : "#ffffff",
                color: certScope === "month" ? "#ffffff" : "#111827",
                cursor: "pointer",
              }}
            >
              This Month
            </button>

            <button
              onClick={() => setCertScope("year")}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor:
                  certScope === "year" ? "#800000" : "#ffffff",
                color: certScope === "year" ? "#ffffff" : "#111827",
                cursor: "pointer",
              }}
            >
              This Year
            </button>
          </div>
        </Card>
      </div>

      {/* ================= REST OF DASHBOARD ================= */}

      {/* ================= SECTION 3: REQUIRES YOUR ACTION ================= */}
      <Card>
        <h3 style={sectionHeading}>🔔 Requires Your Action</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Item 1 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "10px",
            }}
          >
            <div>
              <div style={{ fontWeight: "600" }}>Ideathon 2025</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>
                12 registrations pending approval
              </div>
            </div>
            <Button onClick={() => alert("Navigate to Registrations")}>
              Approve
            </Button>
          </div>

          {/* Item 2 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "10px",
            }}
          >
            <div>
              <div style={{ fontWeight: "600" }}>Startup Bootcamp</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>
                Attendance not started
              </div>
            </div>
            <Button variant="secondary" onClick={() => alert("Open Attendance")}>
              Open Attendance
            </Button>
          </div>

          {/* Item 3 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: "600" }}>AI Workshop</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>
                Feedback pending from participants
              </div>
            </div>
            <Button variant="secondary" onClick={() => alert("View Feedback")}>
              View Feedback
            </Button>
          </div>
        </div>
      </Card>

      {/* ================= SECTION 4: UPCOMING & ONGOING EVENTS ================= */}
      <Card>
        <h3 style={sectionHeading}>Upcoming & Ongoing Events</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", fontSize: "13px", color: "#6b7280" }}>
              <th style={{ paddingBottom: "8px" }}>Event Name</th>
              <th style={{ paddingBottom: "8px" }}>Date Range</th>
              <th style={{ paddingBottom: "8px" }}>Registration</th>
              <th style={{ paddingBottom: "8px" }}>Attendance</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "14px" }}>
            <tr>
              <td style={{ padding: "10px 0" }}>Ideathon 2025</td>
              <td>12–14 Feb 2025</td>
              <td>
                <span style={{ color: "#16a34a", fontWeight: "600" }}>🟢 Ready</span>
              </td>
              <td>
                <span style={{ color: "#f59e0b", fontWeight: "600" }}>🟡 Ongoing</span>
              </td>
            </tr>

            <tr>
              <td style={{ padding: "10px 0" }}>Startup Bootcamp</td>
              <td>20–25 Feb 2025</td>
              <td>
                <span style={{ color: "#b91c1c", fontWeight: "600" }}>
                  🔴 Needs attention
                </span>
              </td>
              <td>
                <span style={{ color: "#6b7280" }}>Not started</span>
              </td>
            </tr>

            <tr>
              <td style={{ padding: "10px 0" }}>AI Workshop</td>
              <td>02–03 Mar 2025</td>
              <td>
                <span style={{ color: "#6b7280" }}>Closed</span>
              </td>
              <td>
                <span style={{ color: "#16a34a", fontWeight: "600" }}>🟢 Ready</span>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* ================= SECTION 5: PARTICIPATION SNAPSHOT ================= */}
      <Card>
        <h3 style={sectionHeading}>Participation Snapshot</h3>
        <div style={{ display: "grid", gap: "16px" }}>
          {/* Registrations vs Approvals */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
              Registrations vs Approvals
            </div>
            <div
              style={{
                height: "10px",
                backgroundColor: "#e5e7eb",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "78%", // approvals %
                  height: "100%",
                  backgroundColor: "#16a34a",
                }}
              />
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
              780 approved out of 1000 registrations
            </div>
          </div>

          {/* Attendance Rate */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "13px", fontWeight: "600" }}>
              Attendance Rate
            </span>
            <span style={{ fontWeight: "700", color: "#16a34a" }}>92%</span>
          </div>

          {/* Feedback Completion */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "13px", fontWeight: "600" }}>
              Feedback Completion
            </span>
            <span style={{ fontWeight: "700", color: "#f59e0b" }}>86%</span>
          </div>
        </div>
      </Card>

      {/* ================= SECTION 6: AWARDS & OUTCOMES HIGHLIGHT ================= */}
      <Card>
        <h3 style={sectionHeading}>Awards & Outcomes Highlight</h3>
        <div style={{ display: "grid", gap: "12px" }}>
          {/* Headline impact */}
          <div style={{ fontSize: "15px", fontWeight: "600" }}>
            🏆 4 Inter-College Awards Secured This Year
          </div>

          {/* Best performing event */}
          <div style={{ fontSize: "13px", color: "#374151" }}>
            ⭐ Best Performing Event: <strong>Ideathon 2025</strong>
          </div>

          {/* Callout outcomes */}
          <ul style={{ paddingLeft: "18px", lineHeight: "1.8", marginTop: "6px" }}>
            <li>3 hackathon teams shortlisted at national level</li>
            <li>2 student startups successfully incubated</li>
            <li>1 patent-ready prototype submitted for review</li>
          </ul>
        </div>
      </Card>

      {/* ================= SECTION 7: QUICK LINKS ================= */}
      <Card>
        <h3 style={sectionHeading}>Quick Links</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
          }}
        >
          <Button onClick={() => alert("Navigate to Create Event")}>
            ➕ Create Event
          </Button>

          <Button variant="secondary" onClick={() => alert("View Registrations")}>
            👥 View Registrations
          </Button>

          <Button variant="secondary" onClick={() => alert("Generate QR")}>
            📷 Generate QR
          </Button>

          <Button variant="secondary" onClick={() => alert("Upload Evidence")}>
            📂 Upload Evidence
          </Button>
        </div>
      </Card>

      {/* ================= SECTION 8: REVIEWER SNAPSHOT PREVIEW ================= */}
      <Card>
        <h3 style={sectionHeading}>Reviewer Snapshot (Read-Only)</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "22px", fontWeight: "700" }}>28</div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>Total Events</div>
          </div>

          <div>
            <div style={{ fontSize: "22px", fontWeight: "700" }}>1640</div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>Participants</div>
          </div>

          <div>
            <div style={{ fontSize: "22px", fontWeight: "700" }}>1125</div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              Certificates Issued
            </div>
          </div>

          <div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#16a34a" }}>
              96%
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              Evidence Completeness
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={() => alert("Open Reviewer Snapshot")}
        >
          Open Full Reviewer View
        </Button>
      </Card>

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

export default AdminDashboard;