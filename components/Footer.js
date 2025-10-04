export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 40,
        padding: 20,
        background: "#f7f7f7",
        borderTop: "1px solid #ddd",
        textAlign: "center",
      }}
    >
      <p>© 2025 Zaan. جميع الحقوق محفوظة.</p>
      <div style={{ marginTop: 10 }}>
        <a href="/contact" style={link}>تواصل معنا</a> |{" "}
        <a href="/admin/login" style={link}>الأدمن</a>
      </div>
    </footer>
  );
}

const link = {
  color: "#0a7",
  textDecoration: "none",
  margin: "0 6px",
};
