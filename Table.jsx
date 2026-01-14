function Table({ columns, data }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#ffffff",
      }}
    >
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              style={{
                textAlign: "left",
                padding: "10px",
                borderBottom: "1px solid #e5e7eb",
                fontWeight: "600",
              }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              style={{ padding: "12px", color: "#6b7280" }}
            >
              No data available
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
