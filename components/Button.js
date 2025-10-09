// components/Button.js
export default function PrimaryButton({ children, onClick, type = "button", style = {}, disabled = false }) {
  const baseStyle = {
    backgroundColor: disabled ? "#042f1aff" : "#d58e6c", // اللون الأخضر الرسمي (ZAAN Green)
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: 8,
    fontSize: 15,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    fontWeight: "600",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    ...style,
  };

  const hoverStyle = {
    backgroundColor: "#032117ff", // درجة أغمق عند الـ hover
  };

  return (
    <button
      type={type}
      onClick={!disabled ? onClick : undefined}
      style={baseStyle}
      onMouseEnter={(e) => !disabled && (e.target.style.backgroundColor = hoverStyle.backgroundColor)}
      onMouseLeave={(e) => !disabled && (e.target.style.backgroundColor = baseStyle.backgroundColor)}
    >
      {children}
    </button>
  );
}
