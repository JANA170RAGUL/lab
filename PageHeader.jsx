function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: subtitle ? "6px" : "0",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
