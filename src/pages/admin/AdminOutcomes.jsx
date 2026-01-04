import { useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

function AdminOutcomes() {
  /* ================= GOVERNANCE FLAGS ================= */
  const eventStatus = "Completed"; // Draft | LIVE | Completed | Archived
  const canAddRecords = eventStatus === "Completed";

  /* ================= STATE ================= */
  const [showDocPreview, setShowDocPreview] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);

  /* ================= DATA (UI MOCK) ================= */
  const awards = [
    {
      id: 1,
      title: "Best Innovation",
      category: "Hackathon",
      level: "Institute",
      recipient: "Team Alpha",
    },
    {
      id: 2,
      title: "Excellence Award",
      category: "Workshop",
      level: "State",
      recipient: "Harsha M",
    },
  ];

  const outcomes = [
    {
      id: 1,
      project: "Smart Health Aid",
      team: "Team Beta",
      status: "Prototype",
    },
    {
      id: 2,
      project: "AI Attendance System",
      team: "Harsha M",
      status: "Startup Potential",
    },
  ];

  return (
    <>
      {/* ================= SECTION 1: PAGE HEADER ================= */}
      <Card>
        <div style={headerRow}>
          <div>
            <div style={title}>Awards & Outcomes</div>
            <div style={subtitle}>
              Innovation Achievements & Event Impact Tracking
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select style={select}>
              <option>Select Event</option>
              <option>FDP on Artificial Intelligence</option>
              <option>Startup Bootcamp</option>
            </select>

            <Badge
              label={eventStatus}
              type={eventStatus === "Completed" ? "success" : "warning"}
            />
          </div>
        </div>
      </Card>

      {/* ================= SECTION 2: EVENT SUMMARY STRIP ================= */}
      <Card>
        <div style={summaryGrid}>
          <Summary label="Event Name" value="FDP on Artificial Intelligence" />
          <Summary label="Event Dates" value="10–12 January (3 Days)" />
          <Summary label="Participants" value="42" />
          <Summary label="Awards Recorded" value={awards.length} />
          <Summary label="Projects Initiated" value={outcomes.length} />
        </div>
      </Card>

      {/* ================= SECTION 3: ACTION CONTROL PANEL ================= */}
      <Card title="Actions">
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Button
            disabled={!canAddRecords}
            onClick={() => alert("Open Add Award Modal")}
          >
            Add Award
          </Button>

          <Button
            variant="secondary"
            disabled={!canAddRecords}
            onClick={() => alert("Open Add Project Outcome Modal")}
          >
            Add Project Outcome
          </Button>

          {!canAddRecords && (
            <span style={hint}>
              Actions enabled only after event completion
            </span>
          )}
        </div>
      </Card>

      {/* ================= SECTION 4: AWARDS TABLE ================= */}
      <Card title="Awards">
        <Table>
          <thead>
            <tr>
              <th>Award Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Student / Team</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {awards.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.category}</td>
                <td>{a.level}</td>
                <td>{a.recipient}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setActiveDocument({
                        name: "award_document.pdf",
                        event: "FDP on Artificial Intelligence",
                        uploaded: "12 Jan 2026, 05:20 PM",
                      });
                      setShowDocPreview(true);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* ================= SECTION 6: PROJECT OUTCOMES TABLE ================= */}
      <Card title="Project Outcomes">
        <Table>
          <thead>
            <tr>
              <th>Project Title</th>
              <th>Team / Student</th>
              <th>Outcome Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {outcomes.map((o) => (
              <tr key={o.id}>
                <td>{o.project}</td>
                <td>{o.team}</td>
                <td>{o.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setActiveDocument({
                        name: "outcome_document.pdf",
                        event: "FDP on Artificial Intelligence",
                        uploaded: "13 Jan 2026, 06:10 PM",
                      });
                      setShowDocPreview(true);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* ================= SECTION 8: DOCUMENT PREVIEW MODAL ================= */}
      {showDocPreview && activeDocument && (
        <div style={overlay}>
          <div style={modal}>
            <div style={modalTitle}>Supporting Document Preview</div>

            <div style={previewBox}>PDF / Image Preview Area</div>

            <div style={meta}>
              <div><strong>File:</strong> {activeDocument.name}</div>
              <div><strong>Event:</strong> {activeDocument.event}</div>
              <div><strong>Uploaded:</strong> {activeDocument.uploaded}</div>
            </div>

            <div style={modalActions}>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDocPreview(false);
                  setActiveDocument(null);
                }}
              >
                Close
              </Button>
            </div>

            <div style={hint}>
              Documents are preserved for audit and inspection.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= SMALL COMPONENTS ================= */
function Summary({ label, value }) {
  return (
    <div>
      <strong>{label}</strong>
      <div style={{ fontWeight: "600", marginTop: "4px" }}>{value}</div>
    </div>
  );
}

function Table({ children }) {
  return (
    <table style={table}>
      {children}
    </table>
  );
}

/* ================= STYLES ================= */
const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
};

const title = { fontSize: "20px", fontWeight: "700" };
const subtitle = { fontSize: "13px", color: "#6b7280", marginTop: "4px" };

const select = {
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "13px",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  fontSize: "13px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "520px",
};

const modalTitle = {
  fontSize: "16px",
  fontWeight: "700",
  marginBottom: "12px",
};

const previewBox = {
  height: "240px",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
  background: "#f9fafb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16px",
  color: "#6b7280",
};

const meta = { fontSize: "13px", lineHeight: "1.8" };

const modalActions = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "16px",
};

const hint = {
  fontSize: "12px",
  color: "#6b7280",
  marginTop: "8px",
};

export default AdminOutcomes;