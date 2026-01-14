import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";

function AdminCertificateDetails() {
  const { certificateBatchId } = useParams();

  const columns = ["Student Name", "Roll No", "Certificate Status"];

  const data = [
    ["Ananya Sharma", "CSE21A001", "Issued"],
    ["Rahul Verma", "ECE21B014", "Issued"],
    ["Sneha Reddy", "ME21C023", "Issued"],
  ];

  return (
    <>
      <h1 style={{ marginBottom: "16px" }}>Certificate Batch Details</h1>

      <Card title={`Certificate Batch ID: ${certificateBatchId}`}>
        <Badge label="Issued" type="success" />
        <Table columns={columns} data={data} />
      </Card>
    </>
  );
}

export default AdminCertificateDetails;
