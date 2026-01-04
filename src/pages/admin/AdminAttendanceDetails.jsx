import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";

function AdminAttendanceDetails() {
  const { attendanceId } = useParams();

  const columns = ["Student Name", "Roll No", "Attendance Status"];

  const data = [
    ["Ananya Sharma", "CSE21A001", "Present"],
    ["Rahul Verma", "ECE21B014", "Present"],
    ["Sneha Reddy", "ME21C023", "Absent"],
  ];

  return (
    <>
      <h1 style={{ marginBottom: "16px" }}>Attendance Details</h1>

      <Card title={`Attendance Batch ID: ${attendanceId}`}>
        <Badge label="Pending Verification" type="warning" />
        <Table columns={columns} data={data} />
      </Card>
    </>
  );
}

export default AdminAttendanceDetails;
