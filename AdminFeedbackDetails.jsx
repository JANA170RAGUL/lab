import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

function AdminFeedbackDetails() {
  const { feedbackId } = useParams();

  return (
    <>
      <h1 style={{ marginBottom: "16px" }}>Feedback Summary</h1>

      <Card title={`Feedback Batch ID: ${feedbackId}`}>
        <Badge label="Pending Review" type="warning" />
        <ul style={{ paddingLeft: "18px", lineHeight: "1.8", marginTop: "12px" }}>
          <li>Overall Rating: 4.6 / 5</li>
          <li>Content Quality: Excellent</li>
          <li>Speaker Effectiveness: Very Good</li>
          <li>Relevance to Students: High</li>
        </ul>
      </Card>
    </>
  );
}

export default AdminFeedbackDetails;
