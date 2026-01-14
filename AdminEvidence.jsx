import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

/* ================= FIXED EVIDENCE CATEGORIES ================= */
const EVIDENCE_CATEGORIES = [
  "Management Approval",
  "Event Brochure",
  "Event Agenda",
  "Detailed Event Report",
  "Event Photos",
  "Sample Project / Prototype",
  "Bills Copy",
];

function AdminEvidence() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  /* ================= EXPENSE STATE ================= */
  const [expenses, setExpenses] = useState([]);
  const [expenseItem, setExpenseItem] = useState({
    category: "",
    description: "",
    quantity: "",
    amount: "",
    remarks: "",
  });

  const totalAmount =
    expenseItem.quantity * (Number(expenseItem.amount) || 0);

  /* ================= SAMPLE EVIDENCE DATA ================= */
  const evidenceList = [
    {
      id: 1,
      name: "approval_letter.pdf",
      category: "Management Approval",
      status: "Uploaded",
    },
    {
      id: 2,
      name: "event_photos.zip",
      category: "Event Photos",
      status: "Verified",
    },
    {
      id: 3,
      name: "Expense Statement (Manual Entry)",
      category: "Expense Statement",
      status: expenses.length > 0 ? "Entered" : "Pending",
    },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              Event Evidence Repository
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              Inspection-Ready Evidence & Financial Records
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button onClick={() => setShowUploadModal(true)}>
              Upload Evidence
            </Button>
            <Button variant="secondary" onClick={() => setShowExpenseModal(true)}>
              Enter Expense Statement
            </Button>
          </div>
        </div>
      </Card>

      {/* ================= EVIDENCE TABLE ================= */}
      <Card>
        <h3 style={sectionHeading}>Evidence Records</h3>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Item</th>
              <th style={th}>Category</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {evidenceList.map((e) => (
              <tr key={e.id}>
                <td style={td}>{e.name}</td>
                <td style={td}>{e.category}</td>
                <td style={td}>
                  <Badge
                    label={e.status}
                    type={e.status === "Verified" ? "success" : "warning"}
                  />
                </td>
                <td style={td}>
                  <Button variant="secondary">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* ================= UPLOAD MODAL (NON-EXPENSE) ================= */}
      {showUploadModal && (
        <Modal title="Upload Evidence" onClose={() => setShowUploadModal(false)}>
          <select style={input}>
            <option>Select Evidence Category *</option>
            {EVIDENCE_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input type="file" style={{ marginTop: "12px" }} />

          <Footer
            onCancel={() => setShowUploadModal(false)}
            onSave={() => {
              alert("Evidence uploaded");
              setShowUploadModal(false);
            }}
          />
        </Modal>
      )}

      {/* ================= EXPENSE STATEMENT MODAL ================= */}
      {showExpenseModal && (
        <Modal
          title="Expense Statement (Manual Entry)"
          onClose={() => setShowExpenseModal(false)}
        >
          <input
            style={{ ...input, boxSizing: "border-box" }}
            placeholder="Expense Category"
            value={expenseItem.category}
            onChange={(e) =>
              setExpenseItem({ ...expenseItem, category: e.target.value })
            }
          />

          <textarea
            style={{ ...input, boxSizing: "border-box" }}
            placeholder="Description"
            value={expenseItem.description}
            onChange={(e) =>
              setExpenseItem({ ...expenseItem, description: e.target.value })
            }
          />

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              style={input}
              type="number"
              placeholder="Amount"
              value={expenseItem.amount}
              onChange={(e) =>
                setExpenseItem({ ...expenseItem, amount: e.target.value })
              }
            />
            <input
              style={input}
              type="number"
              placeholder="Quantity of notes"
              value={expenseItem.quantity}
              onChange={(e) =>
                setExpenseItem({
                  ...expenseItem,
                  quantity: e.target.value,
                })
              }
            />
          </div>

          <div style={{ fontSize: "13px", marginTop: "8px" }}>
            <strong>Total:</strong> ₹{totalAmount}
          </div>

          <textarea
            style={{ ...input, boxSizing: "border-box" }}
            placeholder="Remarks"
            value={expenseItem.remarks}
            onChange={(e) =>
              setExpenseItem({ ...expenseItem, remarks: e.target.value })
            }
          />

          <Footer
            onCancel={() => setShowExpenseModal(false)}
            onSave={() => {
              setExpenses([...expenses, { ...expenseItem, totalAmount }]);
              alert("Expense entry saved");
              setShowExpenseModal(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}

/* ================= SHARED COMPONENTS ================= */
function Modal({ title, children, onClose }) {
  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>{title}</h3>
        {children}
        <div style={{ marginTop: "12px", fontSize: "12px", color: "#6b7280" }}>
          Expense data becomes read-only after evidence finalization.
        </div>
      </div>
    </div>
  );
}

function Footer({ onCancel, onSave }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSave}>Save</Button>
    </div>
  );
}

/* ================= STYLES ================= */
const table = { width: "100%", borderCollapse: "collapse", fontSize: "13px" };
const th = { textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" };
const td = { padding: "10px", borderBottom: "1px solid #e5e7eb" };
const input = {
  width: "100%",
  padding: "8px 10px",
  marginTop: "8px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "13px",
};
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 50,
};
const modal = {
  background: "#fff",
  padding: "24px",
  width: "560px",
  borderRadius: "10px",
};

const sectionHeading = {
  fontSize: "16px",
  fontWeight: "700",
  marginTop: "-2px",
  marginBottom: "20px",
  color: "#111827",
};

export default AdminEvidence;