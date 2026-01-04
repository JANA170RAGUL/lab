function Card({ title, children }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        border: "1px solid #e5e7eb",
      }}
    >
      {title && (
        <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export default Card;
