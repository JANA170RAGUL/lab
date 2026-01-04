import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

function ReviewerSnapshot() {
  return (
    <>
      {/* ================= SECTION 1: HEADER ================= */}
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>AICTE IDEA Lab — Reviewer Snapshot</h2>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#6b7280" }}>
              Read-only compliance & performance overview
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select style={selectStyle}>
              <option>2024–25</option>
              <option>2023–24</option>
            </select>
            <Badge label="XYZ Engineering College" />
          </div>
        </div>
      </Card>

      {/* ================= SECTION 2: OVERALL KPIs ================= */}
      <div style={kpiGrid}>
        <Kpi title="Total Events Conducted" value="24" />
        <Kpi title="Total Participants" value="1,240" />
        <Kpi title="Total AICTE Points" value="360" />
        <Kpi title="Certificates Issued" value="980" />
        <Kpi title="Evidence Completeness" value="100%" />
      </div>

      {/* ================= SECTION 3: EVENT PERFORMANCE ================= */}
      <Card title="Event Performance Summary">
        <List
          items={[
            "FDPs Conducted: 6",
            "Bootcamps Conducted: 4",
            "Workshops Conducted: 8",
            "Conferences Conducted: 2",
            "Symposia Conducted: 1",
            "Other AICTE Events: 3",
          ]}
        />
      </Card>

      {/* ================= SECTION 4: COMPLIANCE ================= */}
      <Card title="Participation & Compliance Snapshot">
        <List
          items={[
            "Average Attendance Rate: 86%",
            "Average Feedback Completion: 79%",
            "Certificate Compliance: 100%",
          ]}
        />
      </Card>

      {/* ================= SECTION 5: EVIDENCE ================= */}
      <Card title="Evidence & Audit Readiness">
        <List
          items={[
            "Events with Evidence Uploaded: 24 / 24",
            "Attendance Proof Available ✔",
            "Feedback Reports Available ✔",
            "Certificate Samples Available ✔",
            "Approval Proof Uploaded ✔",
          ]}
        />
      </Card>

      {/* ================= SECTION 6: AWARDS & OUTCOMES ================= */}
      <Card title="Awards & Innovation Outcomes">
        <List
          items={[
            "Institute-Level Awards: 8",
            "State-Level Awards: 4",
            "National-Level Awards: 2",
            "International-Level Awards: 1",
            "Projects Initiated: 12",
            "Prototypes Developed: 7",
            "Patent-Ready Projects: 2",
            "Startup-Potential Projects: 3",
          ]}
        />
      </Card>

      {/* ================= SECTION 7: QUICK ACCESS ================= */}
      <Card title="Quick Evidence Access (View Only)">
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button variant="secondary">View Attendance Proofs</Button>
          <Button variant="secondary">View Feedback Summaries</Button>
          <Button variant="secondary">View Certificates</Button>
          <Button variant="secondary">View Event Reports</Button>
        </div>
      </Card>

      {/* ================= SECTION 8: SYSTEM DECLARATION ================= */}
      <Card title="System Status & Compliance Declaration">
        <List
          items={[
            "All data displayed is system-generated and finalized",
            "Attendance and feedback are mandatory for certificate eligibility",
            "Certificates issued only after verified feedback submission",
            "Evidence and approvals are securely stored and traceable",
            "Records are audit-ready and tamper-resistant",
          ]}
        />
        <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
          This snapshot is strictly for inspection and review purposes. No data
          modification is permitted from this view.
        </p>
      </Card>
    </>
  );
}

/* ================= SMALL UI HELPERS ================= */

const selectStyle = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "13px",
};

const kpiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  marginBottom: "16px",
};

function Kpi({ title, value }) {
  return (
    <Card title={title}>
      <div style={{ fontSize: "26px", fontWeight: "700" }}>{value}</div>
    </Card>
  );
}

function List({ items }) {
  return (
    <ul style={{ paddingLeft: "18px", lineHeight: "1.8", margin: 0 }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default ReviewerSnapshot;