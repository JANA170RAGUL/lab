import Card from "../../components/ui/Card";

function AdminReports() {
  return (
    <>
      <h1 style={{ marginBottom: "16px" }}>Reports & Analytics</h1>

      <Card title="Reports Module">
        <p>
          This section will provide downloadable reports and analytics for:
        </p>
        <ul style={{ paddingLeft: "18px", lineHeight: "1.8" }}>
          <li>Event participation</li>
          <li>Attendance and feedback completion</li>
          <li>Certificate issuance</li>
          <li>Innovation outcomes</li>
        </ul>
      </Card>
    </>
  );
}

export default AdminReports;
