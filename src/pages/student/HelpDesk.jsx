import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

/* ================= APPROVED KNOWLEDGE BASE ================= */
const KNOWLEDGE_BASE = [
  {
    keywords: ["register", "registration"],
    answer:
      "Students can register only for LIVE AICTE IDEA Lab events from the Live Events page. Registration creates a pending approval state until verified by the administrator.",
  },
  {
    keywords: ["attendance", "mark attendance"],
    answer:
      "Attendance is marked strictly via a Google Form provided by the coordinator. No QR codes or in-app attendance marking is used. Submission using registered email and roll number is mandatory.",
  },
  {
    keywords: ["feedback", "why feedback", "feedback mandatory"],
    answer:
      "Feedback submission is mandatory for all participants. If feedback is not submitted successfully, the participation certificate will not be generated, even if attendance is marked.",
  },
  {
    keywords: ["certificate", "certificate eligibility"],
    answer:
      "Certificates are generated only for students who have approved registration, attendance submitted, feedback submitted, and event completed. No manual requests or overrides are permitted.",
  },
  {
    keywords: ["my registrations", "registrations"],
    answer:
      "You can view all events you have registered for, along with approval and completion status, in the My Registrations section of the student portal.",
  },
];

/* ================= FALLBACK MESSAGE ================= */
const FALLBACK_MESSAGE =
  "This information is not available in the system. Please contact the IDEA Lab coordinator for further assistance.";

function HelpDesk() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello 👋\nHow can I help you with AICTE IDEA Lab today?",
    },
  ]);
  const [input, setInput] = useState("");

  /* ================= RESPONSE MATCHING ================= */
  const getResponse = (question) => {
    const q = question.toLowerCase();

    const matched = KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((keyword) => q.includes(keyword))
    );

    return matched ? matched.answer : FALLBACK_MESSAGE;
  };

  const handleAsk = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const assistantReply = {
      role: "assistant",
      text: getResponse(input),
    };

    setMessages([...messages, userMessage, assistantReply]);
    setInput("");
  };

  const suggestedQuestions = [
    "How do I register for an event?",
    "How is attendance marked?",
    "Why is feedback mandatory?",
    "When will I get my certificate?",
    "Where can I see my registrations?",
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <Card>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "18px", cursor: "pointer" }}>←</span>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              Help Desk
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              AICTE IDEA Lab — Student Support
            </div>
          </div>
        </div>
      </Card>

      {/* ================= INTRO ================= */}
      <Card>
        <div style={introBox}>
          <strong>AICTE IDEA Lab Help Desk</strong>
          <ul style={{ marginTop: "8px", paddingLeft: "18px" }}>
            <li>Events & Participation</li>
            <li>Attendance & Feedback</li>
            <li>Certificates & Eligibility</li>
            <li>IDEA Lab Guidelines</li>
          </ul>
          <div style={helperText}>
            This help desk provides verified information only.
          </div>
        </div>
      </Card>

      {/* ================= CHAT AREA ================= */}
      <Card title="Conversation">
        <div style={chatBox}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={msg.role === "assistant" ? assistantMsg : userMsg}
            >
              <strong>{msg.role === "assistant" ? "Assistant" : "You"}:</strong>
              <div style={{ whiteSpace: "pre-line", marginTop: "4px" }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ================= SUGGESTED QUESTIONS ================= */}
      <Card title="Suggested Questions">
        <div style={chipContainer}>
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              style={chip}
              onClick={() => setInput(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </Card>

      {/* ================= INPUT ================= */}
      <Card>
        <div style={inputRow}>
          <input
            type="text"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={inputStyle}
          />
          <Button onClick={handleAsk}>Ask</Button>
        </div>
      </Card>

      {/* ================= FOOTER ================= */}
      <Card>
        <div style={footerNote}>
          This help desk provides guidance based on official AICTE IDEA Lab
          guidelines. No actions can be performed here.
        </div>
      </Card>
    </>
  );
}

/* ================= STYLES ================= */

const introBox = {
  fontSize: "13px",
  backgroundColor: "#f9fafb",
  padding: "14px",
  borderRadius: "8px",
};

const helperText = {
  marginTop: "8px",
  fontSize: "12px",
  color: "#6b7280",
};

const chatBox = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  maxHeight: "320px",
  overflowY: "auto",
};

const assistantMsg = {
  backgroundColor: "#f3f4f6",
  padding: "10px 12px",
  borderRadius: "8px",
  fontSize: "13px",
};

const userMsg = {
  backgroundColor: "#e0f2fe",
  padding: "10px 12px",
  borderRadius: "8px",
  fontSize: "13px",
  alignSelf: "flex-end",
};

const chipContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const chip = {
  fontSize: "12px",
  padding: "6px 10px",
  borderRadius: "16px",
  border: "1px solid #d1d5db",
  backgroundColor: "#ffffff",
  cursor: "pointer",
};

const inputRow = {
  display: "flex",
  gap: "10px",
};

const inputStyle = {
  flex: 1,
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "13px",
};

const footerNote = {
  fontSize: "12px",
  color: "#6b7280",
  textAlign: "center",
};

export default HelpDesk;