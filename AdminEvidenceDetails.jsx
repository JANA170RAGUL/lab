import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";

function AdminEvidenceDetails() {
  const { evidenceId } = useParams();

  const columns = ["Evidence Type", "Description", "Status"];

  const data = [
    ["Attendance Proof", "Google Form Attendance Sheet", "Verified"],
    ["Feedback Summary", "Auto-generated feedback report", "Verified"],
    ["Event Poster", "Official event poster PDF", "Verified"],
    ["Event Photos", "Event photographs (ZIP)", "Verified"],
  ];

  return (
    <>
      <h1 style={{ marginBottom: "16px" }}>Evidence Details</h1>

      <Card title={`Evidence Batch ID: ${evidenceId}`}>
        <Badge label="Inspection Ready" type="success" />
        <Table columns={columns} data={data} />
      </Card>
    </>
  );
}

export default AdminEvidenceDetails;
