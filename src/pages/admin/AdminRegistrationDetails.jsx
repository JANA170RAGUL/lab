import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";

function AdminRegistrationDetails() {
  const { registrationId } = useParams();

  const columns = ["Student Name", "Department", "Year", "Status"];

  const data = [
    ["Ananya Sharma", "CSE", "3rd Year", "Confirmed"],
    ["Rahul Verma", "ECE", "2nd Year", "Confirmed"],
    ["Sneha Reddy", "ME", "4th Year", "Waitlisted"],
  ];

  return (
    <>
      <h1 style={{ marginBottom: "16px" }}>Registration Details</h1>

      <Card title={`Registration Batch ID: ${registrationId}`}>
        <Table columns={columns} data={data} />
      </Card>
    </>
  );
}

export default AdminRegistrationDetails;
