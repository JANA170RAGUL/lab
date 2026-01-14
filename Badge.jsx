function Badge({ label, type = "default" }) {
  const styles = {
    default: {
      backgroundColor: "#e5e7eb",
      color: "#111827",
    },
    success: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
    },
    warning: {
      backgroundColor: "#fef3c7",
      color: "#92400e",
    },
  };

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "600",
        ...styles[type],
      }}
    >
      {label}
    </span>
  );
}

export default Badge;
