import { useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

/* ================= FIXED EVIDENCE CATEGORIES ================= */
const EVIDENCE_CATEGORIES = [
  "Attendance Proof",
  "Event Media (Photos / Videos)",
  "Event Posters & Banners",
  "Feedback Summary Reports",
  "Certificate Proof",
  "Approval Confirmation",
  "Awards & Outcomes",
  "Other Supporting Documents",
];

/* ================= SAMPLE EVIDENCE FILES ================= */
const EVIDENCE_FILES = [
  {
    id: 1,
    name: "attendance_day1.pdf",
    category: "Attendance Proof",
    uploadedOn: "12 Jan 05:10 PM",
    status: "Uploaded",
  },
  {
    id: 2,
    name: "event_poster.png",
    category: "Event Posters & Banners",
    uploadedOn: "10 Jan 09:00 AM",
    status: "Verified",
  },
  {
    id: 3,
    name: "feedback_summary.pdf",
    category: "Feedback Summary Reports",
    uploadedOn: "13 Jan 06:30 PM",
    status: "Finalized",
  },
];

function AdminEvidence() {
  const eventCompleted = true;
  const [evidenceFinalized, setEvidenceFinalized] = useState(false);

  /* ================= MODAL STATES ================= */
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <>
      {/* ================= SECTION 1: PAGE HEADER ================= */}
      <Card>
        <div style={headerRow}>
          <div>
            <div style={title}>Evidence</div>
            <div style={subtitle}>Event Evidence & Inspection Readiness</div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select style={selectStyle}>
              <option>Select Event</option>
              <option>FDP on Artificial Intelligence</option>
            </select>
            <Badge
              label={evidenceFinalized ? "Finalized" : "Completed"}
              type={evidenceFinalized ? "success" : "warning"}
            />
          </div>
        </div>
      </Card>

      {/* ================= SECTION 2: EVENT SUMMARY ================= */}
      <Card>
        <div style={summaryGrid}>
          <SummaryItem label="Event Name" value="FDP on Artificial Intelligence" />
          <SummaryItem label="Event Dates" value="10–12 January (3 Days)" />
          <SummaryItem label="Event Status" value="Completed" />
          <SummaryItem
            label="Evidence Files Uploaded"
            value={EVIDENCE_FILES.length}
            highlight
          />
        </div>
      </Card>

      {/* ================= SECTION 3: CONTROL PANEL ================= */}
      <Card title="Evidence Controls">
        <div style={{ display: "flex", gap: "16px" }}>
          <Button
            disabled={evidenceFinalized}
            onClick={() => setShowUploadModal(true)}
          >
            Upload Evidence
          </Button>

          <Button
            variant="secondary"
            disabled={!eventCompleted || evidenceFinalized}
            onClick={() => setShowFinalizeModal(true)}
          >
            Finalize Evidence
          </Button>
        </div>
      </Card>

      {/* ================= SECTION 4: CATEGORIES ================= */}
      <Card title="Evidence Categories">
        <div style={categoryGrid}>
          {EVIDENCE_CATEGORIES.map((cat) => (
            <div key={cat} style={categoryItem}>
              {cat}
            </div>
          ))}
        </div>
      </Card>

      {/* ================= SECTION 5: FILE TABLE ================= */}
      <Card title="Uploaded Evidence Files">
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>File Name</th>
              <th style={th}>Category</th>
              <th style={th}>Uploaded On</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {EVIDENCE_FILES.map((file) => (
              <tr key={file.id}>
                <td style={td}>{file.name}</td>
                <td style={td}>{file.category}</td>
                <td style={td}>{file.uploadedOn}</td>
                <td style={td}>
                  <Badge
                    label={evidenceFinalized ? "Finalized" : file.status}
                    type={
                      evidenceFinalized
                        ? "success"
                        : file.status === "Verified"
                        ? "warning"
                        : "default"
                    }
                  />
                </td>
                <td style={td}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setPreviewFile(file);
                      setShowPreviewModal(true);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* ================= SECTION 6: UPLOAD MODAL ================= */}
      {showUploadModal && (
        <div style={overlay}>
          <div style={modal}>
            <h3 style={{ marginBottom: "12px" }}>Upload Evidence</h3>

            <label style={label}>Evidence Category</label>
            <select
              style={input}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {EVIDENCE_CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <label style={label}>Select File</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={input}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
              <Button
                disabled={!selectedCategory || !selectedFile}
                onClick={() => {
                  alert("Evidence uploaded (UI only)");
                  setShowUploadModal(false);
                }}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 7: PREVIEW MODAL ================= */}
      {showPreviewModal && previewFile && (
        <div style={overlay}>
          <div style={modal}>
            <h3 style={{ marginBottom: "12px" }}>Evidence Preview</h3>
            <p><strong>File:</strong> {previewFile.name}</p>
            <p><strong>Category:</strong> {previewFile.category}</p>
            <p><strong>Uploaded:</strong> {previewFile.uploadedOn}</p>

            <div style={previewBox}>
              File preview will appear here
            </div>

            <div style={{ textAlign: "right" }}>
              <Button
                variant="secondary"
                onClick={() => setShowPreviewModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 8: FINALIZE CONFIRMATION MODAL ================= */}
      {showFinalizeModal && (
        <div style={overlay}>
          <div style={modal}>
            <h3 style={{ marginBottom: "12px", color: "#b91c1c" }}>
              Finalize Evidence
            </h3>

            <p style={{ fontSize: "13px", marginBottom: "12px" }}>
              Finalizing evidence will lock all uploaded files for this event.
            </p>

            <ul style={{ fontSize: "13px", paddingLeft: "18px", marginBottom: "16px" }}>
              <li>No new uploads allowed</li>
              <li>No edits or replacements</li>
              <li>Action cannot be undone</li>
            </ul>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <Button
                variant="secondary"
                onClick={() => setShowFinalizeModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setEvidenceFinalized(true);
                  setShowFinalizeModal(false);
                }}
              >
                Confirm Finalize
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= HELPERS & STYLES ================= */

const SummaryItem = ({ label, value, highlight }) => (
  <div>
    <strong>{label}</strong>
    <div style={{ fontWeight: highlight ? "700" : "400", color: highlight ? "#2563eb" : "" }}>
      {value}
    </div>
  </div>
);

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
};

const title = { fontSize: "20px", fontWeight: "700" };
const subtitle = { fontSize: "13px", color: "#6b7280" };

const selectStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  fontSize: "13px",
};

const categoryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "10px",
};

const categoryItem = {
  padding: "10px",
  backgroundColor: "#f3f4f6",
  borderRadius: "6px",
  borderLeft: "4px solid #2563eb",
  fontSize: "13px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
};

const th = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
};

const overlay = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
};

const modal = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  width: "420px",
};

const previewBox = {
  height: "140px",
  backgroundColor: "#f3f4f6",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  color: "#6b7280",
  marginBottom: "16px",
};

const label = { fontSize: "13px", fontWeight: "600", marginTop: "10px" };
const input = {
  width: "100%",
  padding: "8px",
  marginTop: "6px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
};

export default AdminEvidence;