function Modal({ title, children, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <div style={{ marginBottom: "12px", fontWeight: "600" }}>
          {title}
        </div>
        {children}
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
