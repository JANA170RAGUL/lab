import { useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";

function AdminCertificates() {
  const [previewStudent, setPreviewStudent] = useState(null);
  const [showLockModal, setShowLockModal] = useState(false);
  const [certificatesLocked, setCertificatesLocked] = useState(false);

  const certificatesGenerated = true;

  const certificateRows = [
    {
      roll: "22AD01",
      name: "Harsha M",
      attendance: "Present",
      feedback: "Submitted",
      status: "Generated",
      certId: "IDEA-2026-00123",
    },
    {
      roll: "22AD07",
      name: "Ananya K",
      attendance: "Present",
      feedback: "Submitted",
      status: "Generated",
      certId: "IDEA-2026-00124",
    },
    {
      roll: "22AD12",
      name: "Rahul S",
      attendance: "Present",
      feedback: "Not Submitted",
      status: "Not Eligible",
    },
  ];

  const columns = [
    "Roll No",
    "Student Name",
    "Attendance",
    "Feedback",
    "Certificate Status",
    "Action",
  ];

  const tableData = certificateRows.map((row) => [
    row.roll,
    row.name,
    <Badge label={row.attendance} type="success" />,
    <Badge
      label={row.feedback}
      type={row.feedback === "Submitted" ? "success" : "warning"}
    />,
    <Badge
      label={row.status}
      type={row.status === "Generated" ? "success" : "danger"}
    />,
    row.status === "Generated" ? (
      <Button size="sm" onClick={() => setPreviewStudent(row)}>
        View
      </Button>
    ) : (
      "—"
    ),
  ]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              Certificates
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              Certificate Generation & Governance Control
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select style={{ padding: "8px", fontSize: "13px" }}>
              <option>FDP on Artificial Intelligence</option>
            </select>
            <Badge
              label={certificatesLocked ? "Locked" : "Generated"}
              type={certificatesLocked ? "danger" : "success"}
            />
          </div>
        </div>
      </Card>

      {/* ================= SUMMARY ================= */}
      <Card>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
            fontSize: "13px",
          }}
        >
          <div><strong>Approved</strong><div>60</div></div>
          <div><strong>Attendance</strong><div>42</div></div>
          <div><strong>Feedback</strong><div>35</div></div>
          <div><strong>Eligible</strong><div style={{ color: "#16a34a" }}>35</div></div>
        </div>
      </Card>

      {/* ================= CONTROLS ================= */}
      <Card>
        <h3 style={sectionHeading}>Certificate Controls</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <Button disabled>Generate Certificates</Button>
          <Button
            variant="secondary"
            disabled={certificatesLocked}
            onClick={() => setShowLockModal(true)}
          >
            Lock Certificates
          </Button>
        </div>
      </Card>

      {/* ================= STATUS ================= */}
      {certificatesGenerated && (
        <Card>
          <h3 style={sectionHeading}>Certificate Generation Status</h3>
          <div style={{ display: "flex", gap: "24px", fontSize: "13px" }}>
            <div><strong>Total Eligible</strong><div>35</div></div>
            <div><strong>Generated</strong><div>35</div></div>
            <div><strong>Time</strong><div>12 Jan 04:20 PM</div></div>
          </div>
        </Card>
      )}

      {/* ================= TABLE ================= */}
      <Card>
        <h3 style={sectionHeading}>Certificates (Read-only)</h3>
        <Table columns={columns} data={tableData} />
      </Card>

      {/* ================= DOWNLOAD ================= */}
      {certificatesGenerated && (
        <Card>
          <h3 style={sectionHeading}>Download Options</h3>
          <div style={{ display: "flex", gap: "16px" }}>
            <Button>Download All Certificates (ZIP)</Button>
            <Button variant="secondary">Export Certificate List (Excel)</Button>
          </div>
        </Card>
      )}

      {/* ================= PREVIEW MODAL ================= */}
      {previewStudent && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Certificate Preview</h3>
            <div style={previewBox}>PDF Preview Placeholder</div>
            <div><strong>Certificate ID:</strong> {previewStudent.certId}</div>
            <Button onClick={() => setPreviewStudent(null)}>Close</Button>
          </div>
        </div>
      )}

      {/* ================= LOCK CONFIRMATION MODAL ================= */}
      {showLockModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Lock Certificates?</h3>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>
              Certificates will become final and read-only.
              <br />
              This action cannot be undone.
            </p>

            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <Button variant="secondary" onClick={() => setShowLockModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setCertificatesLocked(true);
                  setShowLockModal(false);
                }}
              >
                Confirm Lock
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ====== Shared modal styles ====== */
const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
};

const modalStyle = {
  background: "#fff",
  padding: "24px",
  borderRadius: "8px",
  width: "420px",
};

const previewBox = {
  height: "200px",
  backgroundColor: "#f3f4f6",
  margin: "12px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "13px",
  fontSize: "13px",
  color: "#6b7280",
};

const sectionHeading = {
  fontSize: "16px",
  fontWeight: "700",
  marginTop: "-2px",
  marginBottom: "20px",
  color: "#111827",
};

export default AdminCertificates;