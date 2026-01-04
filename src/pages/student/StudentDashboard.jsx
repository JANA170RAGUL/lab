import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

/* ================= MOCK STUDENT CONTEXT ================= */
const student = {
  name: "Harshawardhan M S",
  roll: "22AD01",
  department: "AI & Data Science",
  academicYear: "2025–26",
};

/* ================= DASHBOARD DATA ================= */
const summary = {
  registered: 5,
  approved: 3,
  pendingActions: 1,
  certificates: 2,
};

const actionRequired = [
  { id: 1, text: 'Attendance pending for "FDP on AI"' },
  { id: 2, text: 'Feedback pending for "Bootcamp on Cloud"' },
];

const events = [
  {
    id: 1,
    name: "FDP on AI",
    status: "Approved",
    attendance: "Submitted",
    feedback: "Pending",
    certificate: "—",
  },
  {
    id: 2,
    name: "Bootcamp on Cloud",
    status: "Completed",
    attendance: "Submitted",
    feedback: "Submitted",
    certificate: "Available",
  },
  {
    id: 3,
    name: "Workshop on IoT",
    status: "Pending",
    attendance: "—",
    feedback: "—",
    certificate: "—",
  },
];

const notifications = [
  {
    id: 1,
    type: "success",
    message: 'Registration approved for "FDP on AI"',
  },
  {
    id: 2,
    type: "info",
    message: 'Attendance opened for "Bootcamp on Cloud"',
  },
  {
    id: 3,
    type: "success",
    message: 'Certificate generated for "Workshop on Data Science"',
  },
];

function StudentDashboard() {
  return (
    <>
      {/* ================= SECTION 1: PAGE HEADER ================= */}
      <Card>
        <div style={{ fontSize: "20px", fontWeight: "700" }}>
          Student Dashboard
        </div>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>
          Overview of your IDEA Lab participation
        </div>
      </Card>

      {/* ================= SECTION 2: STUDENT INFO STRIP ================= */}
      <Card>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
            fontSize: "13px",
          }}
        >
          <div><strong>Name:</strong> {student.name}</div>
          <div><strong>Roll No:</strong> {student.roll}</div>
          <div><strong>Department:</strong> {student.department}</div>
          <div><strong>Academic Year:</strong> {student.academicYear}</div>
        </div>
      </Card>

      {/* ================= SECTION 3: QUICK SUMMARY CARDS ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        <SummaryCard label="Registered Events" value={summary.registered} />
        <SummaryCard label="Approved Events" value={summary.approved} />
        <SummaryCard label="Pending Actions" value={summary.pendingActions} />
        <SummaryCard label="Certificates Earned" value={summary.certificates} />
      </div>

      {/* ================= SECTION 4: ACTION REQUIRED ================= */}
      {actionRequired.length > 0 && (
        <Card title="Action Required">
          <ul style={{ paddingLeft: "18px", lineHeight: "1.8" }}>
            {actionRequired.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* ================= SECTION 5: MY EVENTS OVERVIEW ================= */}
      <Card title="My Events">
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={th}>Event Name</th>
                <th style={th}>Status</th>
                <th style={th}>Attendance</th>
                <th style={th}>Feedback</th>
                <th style={th}>Certificate</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td style={td}>{e.name}</td>
                  <td style={td}><Badge label={e.status} /></td>
                  <td style={td}>{e.attendance}</td>
                  <td style={td}>{e.feedback}</td>
                  <td style={td}>{e.certificate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ================= SECTION 6: ATTENDANCE STATUS ================= */}
      <Card title="Attendance Status">
        <ul style={{ paddingLeft: "18px", lineHeight: "1.8" }}>
          {events.map((e) => (
            <li key={e.id}>
              {e.name} : {e.attendance}
            </li>
          ))}
        </ul>
      </Card>

      {/* ================= SECTION 7: CERTIFICATES ================= */}
      <Card title="Certificates">
        <ul style={{ paddingLeft: "18px", lineHeight: "1.8" }}>
          {events.map((e) => (
            <li key={e.id}>
              {e.name} —{" "}
              {e.certificate === "Available" ? (
                <Button variant="secondary">Download</Button>
              ) : (
                "Not Eligible"
              )}
            </li>
          ))}
        </ul>
      </Card>

      {/* ================= SECTION 8: NOTIFICATIONS ================= */}
      <Card title="Notifications">
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {notifications.map((n) => (
            <li
              key={n.id}
              style={{
                padding: "10px 12px",
                marginBottom: "8px",
                borderRadius: "6px",
                backgroundColor:
                  n.type === "success" ? "#ecfdf5" : "#eff6ff",
                color:
                  n.type === "success" ? "#065f46" : "#1e40af",
                fontSize: "13px",
              }}
            >
              {n.message}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

{/* ================= SECTION 9: QUICK NAVIGATION PANEL ================= */}
<Card title="Quick Access">
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "14px",
    }}
  >
    <Button variant="secondary">Events</Button>
    <Button variant="secondary">My Registrations</Button>
    <Button variant="secondary">Attendance</Button>
    <Button variant="secondary">Feedback</Button>
    <Button variant="secondary">Certificates</Button>
    <Button variant="secondary">AICTE Help Desk</Button>
  </div>

  <div
    style={{
      marginTop: "10px",
      fontSize: "12px",
      color: "#6b7280",
    }}
  >
    Use these shortcuts to quickly access your IDEA Lab activities.
  </div>
</Card>

/* ================= HELPERS ================= */
function SummaryCard({ label, value }) {
  return (
    <Card>
      <div style={{ fontSize: "12px", color: "#6b7280" }}>{label}</div>
      <div style={{ fontSize: "26px", fontWeight: "700" }}>{value}</div>
    </Card>
  );
}

/* ================= TABLE STYLES ================= */
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

export default StudentDashboard;