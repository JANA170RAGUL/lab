import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";

function AdminOutcomeDetails() {
  const { outcomeId } = useParams();

  const columns = ["Title", "Category", "Team Lead", "Result"];

  const data = [
    ["Smart Waste Segregator", "Project", "Ananya Sharma", "Prototype Ready"],
    ["AgroTech Assist", "Startup", "Rahul Verma", "Incubation Stage"],
    ["Green Energy Monitor", "Project", "Sneha Reddy", "Award Winner"],
  ];

  return (
    <>
      <h1 style={{ marginBottom: "16px" }}>Outcome Details</h1>

      <Card title={`Outcome Batch ID: ${outcomeId}`}>
        <Badge label="Verified Outcome" type="success" />
        <Table columns={columns} data={data} />
      </Card>
    </>
  );
}

export default AdminOutcomeDetails;
