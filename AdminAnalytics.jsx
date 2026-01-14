import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function AdminAnalytics() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      {/* ================= SECTION 1: PAGE HEADER & GLOBAL FILTERS ================= */}
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              Reports & Analytics
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
              Performance Monitoring, Compliance & Inspection Readiness
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <select style={filterStyle}>
              <option>Academic Year</option>
              <option>2024–25</option>
              <option>2023–24</option>
            </select>

            <select style={filterStyle}>
              <option>Event Type</option>
              <option>FDP</option>
              <option>Bootcamp</option>
              <option>Workshop</option>
            </select>

            <input type="date" style={filterStyle} />
            <input type="date" style={filterStyle} />

            <Button>Apply Filters</Button>
          </div>
        </div>
      </Card>

      {/* ================= SECTION 2: OVERALL SUMMARY STRIP ================= */}
      <Card>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          <SummaryItem label="Total Events" value="24" />
          <SummaryItem label="Total Registrations" value="1,240" />
          <SummaryItem label="Attendance Rate" value="86%" />
          <SummaryItem label="Feedback Completion" value="79%" />
          <SummaryItem label="Certificates Issued" value="980" />
        </div>
      </Card>

      {/* ================= SECTION 3: REPORT GENERATION PANEL ================= */}
      <Card>
        <h3 style={sectionHeading}>Generate Reports</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          <Button onClick={() => setShowPreview(true)}>Event Report</Button>
          <Button variant="secondary">Registration Report</Button>
          <Button variant="secondary">Attendance Report</Button>
          <Button variant="secondary">Feedback Report</Button>
          <Button variant="secondary">Certificate Report</Button>
          <Button variant="secondary">Awards & Outcomes</Button>
        </div>

        <div style={helperText}>
          Reports are generated from finalized, locked data only.
        </div>
      </Card>

      {/* ================= SECTION 4: ANALYTICS DASHBOARD ================= */}
      <Card>
        <h3 style={sectionHeading}>Analytics Overview</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          <ChartPlaceholder title="Event-wise Participation" />
          <ChartPlaceholder title="Registration Trends" />
          <ChartPlaceholder title="Attendance vs Absentees" />
          <ChartPlaceholder title="Feedback Completion" />
        </div>
      </Card>

      {/* ================= SECTION 5: DETAILED REPORT TABLE ================= */}
      <Card>
        <h3 style={sectionHeading}>Detailed Report</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={th}>Event</th>
                <th style={th}>Registrations</th>
                <th style={th}>Attendance</th>
                <th style={th}>Feedback</th>
                <th style={th}>Certificates</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={td}>FDP on AI</td>
                <td style={td}>120</td>
                <td style={td}>98 (82%)</td>
                <td style={td}>90 (75%)</td>
                <td style={td}>90</td>
                <td style={td}>Completed</td>
              </tr>
              <tr>
                <td style={td}>Startup Bootcamp</td>
                <td style={td}>80</td>
                <td style={td}>72 (90%)</td>
                <td style={td}>70 (87%)</td>
                <td style={td}>70</td>
                <td style={td}>Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* ================= SECTION 6: EXPORT OPTIONS PANEL ================= */}
      <Card>
        <h3 style={sectionHeading}>Export Options</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <Button onClick={() => setShowPreview(true)}>Export PDF</Button>
          <Button variant="secondary">Export Excel</Button>
        </div>
      </Card>

      {/* ================= SECTION 7: REPORT PREVIEW MODAL (STRICT ORDER) ================= */}
      {showPreview && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <div style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>
              Event Report Preview (Inspection Format)
            </div>

            <div
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
                padding: "12px",
                backgroundColor: "#f9fafb",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#374151",
              }}
            >
              <ReportSection title="1. Front Page">
                Institute Name, Academic Year, Event Title, Dates
              </ReportSection>

              <ReportSection title="2. Management Approval">
                Uploaded management approval document.
              </ReportSection>

              <ReportSection title="3. Event Brochure">
                Official event brochure.
              </ReportSection>

              <ReportSection title="4. Participants List (System Generated)">
                Approved participants list.
              </ReportSection>

              <ReportSection title="5. Agenda">
                Event agenda document.
              </ReportSection>

              <ReportSection title="6. Detailed Event Report">
                Detailed narrative report of the event.
              </ReportSection>

              <ReportSection title="7. Attendance Sheet (System Generated)">
                Attendance derived from finalized records.
              </ReportSection>

              <ReportSection title="8. Feedback Summary (System Generated)">
                Aggregated feedback statistics.
              </ReportSection>

              <ReportSection title="9. Event Photos">
                Official event photographs.
              </ReportSection>

              <ReportSection title="10. Sample Project / Prototype">
                Prototype or project documentation (if applicable).
              </ReportSection>

              <ReportSection title="11. Expense Statement (Manual Entry)">
                Structured expense statement rendered from entries.
              </ReportSection>

              <ReportSection title="12. Bills Copies">
                Uploaded bills linked to expenses.
              </ReportSection>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "16px",
              }}
            >
              <Button variant="secondary">Download PDF</Button>
              <Button variant="secondary">Download Excel</Button>
              <Button onClick={() => setShowPreview(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= HELPERS ================= */
function SummaryItem({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: "12px", color: "#6b7280" }}>{label}</div>
      <div style={{ fontSize: "22px", fontWeight: "700" }}>{value}</div>
    </div>
  );
}

function ChartPlaceholder({ title }) {
  return (
    <div
      style={{
        height: "180px",
        border: "1px dashed #d1d5db",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        color: "#9ca3af",
      }}
    >
      {title} (Chart Placeholder)
    </div>
  );
}

function ReportSection({ title, children }) {
  return (
    <div
      style={{
        marginBottom: "14px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontWeight: "600", marginBottom: "6px" }}>{title}</div>
      <div style={{ fontSize: "12px", color: "#4b5563" }}>{children}</div>
    </div>
  );
}

/* ================= STYLES ================= */
const filterStyle = {
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "13px",
};

const helperText = {
  marginTop: "10px",
  fontSize: "12px",
  color: "#6b7280",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
};

const th = {
  textAlign: "left",
  padding: "10px",
  backgroundColor: "#f9fafb",
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
};

const sectionHeading = {
  fontSize: "16px",
  fontWeight: "700",
  marginTop: "-2px",
  marginBottom: "20px",
  color: "#111827",
};

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
  maxWidth: "620px",
};

export default AdminAnalytics;