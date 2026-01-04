import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

/* ================= CERTIFICATE STATUS ENUM ================= */
const CERTIFICATE_STATUS = {
  AVAILABLE: "AVAILABLE",
  PENDING: "PENDING_GENERATION",
  NOT_ELIGIBLE: "NOT_ELIGIBLE",
};

function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [downloadMsg, setDownloadMsg] = useState("");

  /* ================= MOCK CERTIFICATE DATA ================= */
  const certificates = [
    {
      eventId: 1,
      eventName: "FDP on Artificial Intelligence",
      dates: "10–12 January",
      certificateId: "IDEA-2026-00123",
      status: CERTIFICATE_STATUS.AVAILABLE,
    },
    {
      eventId: 2,
      eventName: "Bootcamp on Cloud Computing",
      dates: "05–07 December",
      status: CERTIFICATE_STATUS.PENDING,
    },
    {
      eventId: 3,
      eventName: "Workshop on IoT",
      dates: "18–19 November",
      status: CERTIFICATE_STATUS.NOT_ELIGIBLE,
      reason: "Mandatory feedback not submitted",
    },
  ];

  const handleDownload = (cert) => {
    setDownloadMsg(
      `Certificate download initiated for "${cert.eventName}". This activity is logged by the system.`
    );

    setTimeout(() => {
      setDownloadMsg("");
    }, 3500);
  };

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <Card>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "18px", cursor: "pointer" }}>←</span>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              Certificates
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              AICTE IDEA Lab — Student Portal
            </div>
          </div>
        </div>
      </Card>

      {/* ================= COMPLIANCE NOTICE ================= */}
      <Card>
        <div style={complianceBox}>
          <strong>Compliance Notice</strong>
          <ul style={{ marginTop: "8px", paddingLeft: "18px" }}>
            <li>Certificates are generated automatically by the system.</li>
            <li>
              Eligibility is strictly based on approved registration, attendance
              submission, and mandatory feedback.
            </li>
            <li>
              No manual requests, edits, or overrides are permitted at any stage.
            </li>
            <li>All certificate access and downloads are audit-logged.</li>
          </ul>
        </div>
      </Card>

      {/* ================= DOWNLOAD MESSAGE ================= */}
      {downloadMsg && (
        <Card>
          <div style={successMessage}>{downloadMsg}</div>
        </Card>
      )}

      {/* ================= EMPTY STATE ================= */}
      {certificates.length === 0 && (
        <Card>
          <div style={{ textAlign: "center", padding: "40px 16px" }}>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              No certificates available
            </div>
            <div style={helperText}>
              Certificates will appear only after successful completion of
              attendance and feedback.
            </div>
          </div>
        </Card>
      )}

      {/* ================= CERTIFICATES LIST ================= */}
      {certificates.length > 0 && (
        <Card title="My Certificates">
          <div style={{ display: "grid", gap: "16px" }}>
            {certificates.map((cert) => (
              <div key={cert.eventId} style={cardStyle}>
                <div style={eventTitle}>{cert.eventName}</div>
                <div style={metaText}>Event Dates: {cert.dates}</div>

                {/* ===== AVAILABLE ===== */}
                {cert.status === CERTIFICATE_STATUS.AVAILABLE && (
                  <>
                    <div style={statusSuccess}>
                      Certificate Generated & Available
                    </div>

                    <div style={actionRow}>
                      <Button
                        variant="secondary"
                        onClick={() => setSelectedCert(cert)}
                      >
                        View Details
                      </Button>

                      <Button onClick={() => handleDownload(cert)}>
                        Download Certificate
                      </Button>
                    </div>

                    <div style={auditNote}>
                      Certificates are final, read-only PDFs. Regeneration or
                      modification is not permitted.
                    </div>
                  </>
                )}

                {/* ===== PENDING ===== */}
                {cert.status === CERTIFICATE_STATUS.PENDING && (
                  <>
                    <div style={statusWarning}>
                      Pending Certificate Generation
                    </div>
                    <div style={helperText}>
                      Eligible students will receive certificates only after the
                      institute completes generation.
                    </div>
                  </>
                )}

                {/* ===== NOT ELIGIBLE ===== */}
                {cert.status === CERTIFICATE_STATUS.NOT_ELIGIBLE && (
                  <>
                    <div style={statusError}>Not Eligible</div>
                    <div style={helperText}>
                      Certificate cannot be issued due to the following reason:
                      <ul style={{ marginTop: "6px", paddingLeft: "18px" }}>
                        <li>{cert.reason}</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ================= CERTIFICATE DETAILS MODAL ================= */}
      {selectedCert && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <div style={modalTitle}>Certificate Details</div>

            <DetailRow label="Event Name" value={selectedCert.eventName} />
            <DetailRow label="Event Dates" value={selectedCert.dates} />
            <DetailRow
              label="Certificate ID"
              value={selectedCert.certificateId}
            />
            <DetailRow label="Status" value="Generated & Finalized" />

            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <Button onClick={() => setSelectedCert(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= SMALL COMPONENT ================= */
function DetailRow({ label, value }) {
  return (
    <div style={detailRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* ================= STYLES ================= */

const complianceBox = {
  fontSize: "13px",
  color: "#374151",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "14px",
};

const successMessage = {
  fontSize: "13px",
  color: "#065f46",
  backgroundColor: "#ecfdf5",
  padding: "10px 14px",
  borderRadius: "8px",
};

const cardStyle = {
  padding: "16px",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
};

const eventTitle = { fontSize: "16px", fontWeight: "600" };
const metaText = { fontSize: "13px", color: "#6b7280" };
const helperText = { fontSize: "13px", color: "#6b7280", marginTop: "8px" };
const auditNote = { fontSize: "12px", color: "#6b7280", marginTop: "10px" };

const statusSuccess = { color: "#16a34a", fontWeight: "600" };
const statusWarning = { color: "#d97706", fontWeight: "600" };
const statusError = { color: "#dc2626", fontWeight: "600" };

const actionRow = {
  display: "flex",
  gap: "12px",
  marginTop: "12px",
  flexWrap: "wrap",
};

/* ===== MODAL ===== */
const modalOverlay = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
};

const modalBox = {
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "420px",
};

const modalTitle = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "16px",
};

const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  fontSize: "14px",
};

export default Certificates;