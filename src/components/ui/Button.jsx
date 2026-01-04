function Button({ children, onClick, variant = "primary", disabled = false }) {
  const baseStyle = {
    padding: "10px 16px",
    borderRadius: "6px",
    fontWeight: "600",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      backgroundColor: "#800000", // maroon
      color: "#ffffff",
    },
    secondary: {
      backgroundColor: "#e5e7eb",
      color: "#111827",
    },
  };

  return (
    <button
      style={{ ...baseStyle, ...variants[variant] }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
